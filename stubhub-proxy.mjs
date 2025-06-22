import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const STUBHUB_APP_KEY = process.env.STUBHUB_APP_KEY;
const STUBHUB_APP_SECRET = process.env.STUBHUB_APP_SECRET;

let cachedToken = null;
let tokenExpiry = null;

async function getStubHubToken() {
  const now = Date.now();
  if (cachedToken && tokenExpiry && now < tokenExpiry) {
    return cachedToken;
  }

  const creds = Buffer.from(`${STUBHUB_APP_KEY}:${STUBHUB_APP_SECRET}`).toString('base64');

  const res = await fetch('https://api.stubhub.com/sellers/oauth/accesstoken', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error_description || 'Failed to fetch token');

  cachedToken = data.access_token;
  tokenExpiry = now + (data.expires_in * 1000) - 60000;
  return cachedToken;
}

app.get('/stubhub', async (req, res) => {
  const { q, start, end } = req.query;

  try {
    const token = await getStubHubToken();

    const url = `https://api.stubhub.com/catalog/events?country=US&q=${encodeURIComponent(q)}&eventDateLocalStart=${start}T00:00:00&eventDateLocalEnd=${end}T23:59:59&rows=50&sort=eventDateLocal asc`;

    console.log('📡 Fetching from StubHub:', url);

    const result = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'X-StubHub-Application-Key': STUBHUB_APP_KEY,
      },
    });

    const text = await result.text();

    console.log('🔎 StubHub Response Status:', result.status);
    console.log('📦 StubHub Response Text:', text || '[EMPTY]');

    if (!text || text.trim() === '') {
      return res.status(500).json({
        error: 'StubHub returned empty response',
        stubhubStatus: result.status,
        url,
      });
    }

    try {
      const json = JSON.parse(text);
      return res.json(json);
    } catch (err) {
      return res.status(500).json({
        error: 'StubHub returned invalid JSON',
        raw: text,
        url,
      });
    }
  } catch (err) {
    console.error('❌ Proxy error:', err);
    res.status(500).json({
      error: 'Failed to fetch StubHub data',
      details: err.message,
    });
  }
});

app.listen(3001, () => console.log('✅ StubHub proxy running on port 3001'));
