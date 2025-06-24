// victory.routes.mjs
import express from 'express';
import fetch from 'node-fetch';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const apiKey = process.env.VICTORY_LIVE_API_KEY;
const apiSecret = process.env.VICTORY_LIVE_SECRET;
const searchHost = (process.env.VICTORY_LIVE_BASE_URL || 'api.ticketevolution.com').replace(/^https?:\/\//, '');
// 🔐 Signature generator (used for endpoints that require it)
function generateVictorySignature(stringToSign, secret) {
  return crypto.createHmac('sha256', secret).update(stringToSign).digest('base64');
}

// ✅ Route: /api/brokerages
router.get('/brokerages', async (req, res) => {
  try {
    const method = 'GET';
    const query = 'page=1&per_page=1';
const endpointPath = `${(process.env.VICTORY_LIVE_BASE_URL || 'https://api.ticketevolution.com')}/v9/brokerages`;    const url = `https://${endpointPath}?${query}`;
    const stringToSign = `${method} ${endpointPath}?${query}`;
    const signature = generateVictorySignature(stringToSign, apiSecret);

    const response = await fetch(url, {
      method,
      headers: {
        'X-Token': apiKey,
        'X-Signature': signature,
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('❌ /brokerages error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ Route: /api/listings?event_id=123
router.get('/listings', async (req, res) => {
  const eventId = req.query.event_id;

  if (!eventId) {
    return res.status(400).json({ error: 'Missing event_id parameter' });
  }

  try {
    const method = 'GET';
    const query = `event_id=${eventId}`;
const endpointPath = `${(process.env.VICTORY_LIVE_BASE_URL || 'https://api.ticketevolution.com')}/v9/brokerages`;    const url = `https://${endpointPath}?${query}`;
    const stringToSign = `${method} ${endpointPath}?${query}`;
    const signature = generateVictorySignature(stringToSign, apiSecret);

    const response = await fetch(url, {
      method,
      headers: {
        'X-Token': apiKey,
        'X-Signature': signature,
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('❌ /listings error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ Route: /api/performers/:slug (NO signature required)
router.get('/performers/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const response = await fetch(`${BASE_URL}/performers/${slug}`, {
      headers: {
        'X-Token': apiKey,
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('🎭 /performers/:slug error:', error.message);
    res.status(500).json({ error: 'Failed to fetch performer' });
  }
});

// ✅ Route: /api/events?performer_id=123 (NO signature required)
router.get('/events', async (req, res) => {
  const { performer_id } = req.query;

  if (!performer_id) {
    return res.status(400).json({ error: 'Missing performer_id parameter' });
  }

  try {
    const response = await fetch(`${BASE_URL}/events?performer_id=${performer_id}`, {
      headers: {
        'X-Token': apiKey,
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('📅 /events error:', error.message);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

export default router;