
import express from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';
import axios from 'axios';
import fs from 'fs/promises';

dotenv.config();
const router = express.Router();

const VICTORY_API_TOKEN = process.env.VICTORY_LIVE_API_KEY;
const VICTORY_API_SECRET = process.env.VICTORY_LIVE_SECRET;
const VICTORY_API_HOST = (process.env.VICTORY_LIVE_BASE_URL || 'api.ticketevolution.com').replace(/^https?:\/\//, '');

// 🔐 Signature generator
function generateXSignature(method, host, path, queryString = '') {
  const normalizedQuery = queryString
    .split('&')
    .filter(Boolean)
    .sort()
    .join('&');

  const stringToSign = normalizedQuery
    ? `${method} ${host}${path}?${normalizedQuery}`
    : `${method} ${host}${path}`;

  const hmac = crypto.createHmac('sha256', VICTORY_API_SECRET);
  hmac.update(stringToSign);
  return hmac.digest('base64');
}

// ✅ GET all brokerages (for name resolution)
router.get('/api/brokerages', async (req, res) => {
  try {
    const path = '/v9/brokerages';
    const query = 'page=1&per_page=1000';
    const signature = generateXSignature('GET', VICTORY_API_HOST, path, query);
    const url = `https://${VICTORY_API_HOST}${path}?${query}`;

    const response = await axios.get(url, {
      headers: {
        'X-Token': VICTORY_API_TOKEN,
        'X-Signature': signature,
        'Accept': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('❌ /brokerages error:', error.message);
    res.status(500).json({ error: 'Failed to fetch brokerages' });
  }
});
