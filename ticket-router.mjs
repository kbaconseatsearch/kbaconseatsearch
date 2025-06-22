ok, it did pull events, (took a long time) but same thing with no pricing or available tickets.  to make sure i did it right, can you take a look at our tickets-router.mjs?

import express from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';
import axios from 'axios';

dotenv.config();
const router = express.Router();

const VICTORY_API_TOKEN = process.env.VICTORY_LIVE_API_KEY;
const VICTORY_API_SECRET = process.env.VICTORY_LIVE_SECRET;

function generateXSignature(method, host, path, queryString = '') {
  const sortedQuery = queryString
    .split('&')
    .map(s => s.trim())
    .sort()
    .join('&');

  const stringToSign = `${method} ${host}${path}?${sortedQuery}`;
  const hmac = crypto.createHmac('sha256', VICTORY_API_SECRET);
  hmac.update(stringToSign);
  return hmac.digest('base64');
}

// ✅ Match frontend call: /api/events/search
router.get('/api/events/search', async (req, res) => {
  try {
    const { team, start, end } = req.query;

    if (!team) {
      return res.status(400).json({ error: 'Missing team parameter' });
    }

    const searchHost = 'api.sandbox.ticketevolution.com';

    // Step 1: Performer search
    const searchPath = '/v9/search';
    const searchQuery = `fuzzy=true&page=1&per_page=10&q=${encodeURIComponent(team)}&types=performers`;
    const searchSig = generateXSignature('GET', searchHost, searchPath, searchQuery);

    const performerRes = await axios.get(`https://${searchHost}${searchPath}?${searchQuery}`, {
      headers: {
        'X-Token': VICTORY_API_TOKEN,
        'X-Signature': searchSig,
        'Accept': 'application/json',
      }
    });

    const performer = performerRes.data.results?.[0];
    if (!performer || !performer.id) {
      console.log(`❌ No performer found for ${team}`);
      return res.json({ results: [] });
    }

    const performerId = performer.id;

    // Step 2: Event search
    const eventPath = '/v9/events/search';
    const queryObj = {
      performer_id: performerId,
    };

    if (start) queryObj['occurs_at.gte'] = start;
    if (end) queryObj['occurs_at.lte'] = end;

    const eventQuery = Object.entries(queryObj)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join('&');

    const eventSig = generateXSignature('GET', searchHost, eventPath, eventQuery);

    const eventRes = await axios.get(`https://${searchHost}${eventPath}?${eventQuery}`, {
      headers: {
        'X-Token': VICTORY_API_TOKEN,
        'X-Signature': eventSig,
        'Accept': 'application/json',
      }
    });

    const events = eventRes.data.events || [];

    // ✅ Wrap in expected format
    const listingsPath = '/v9/listings';
const enrichedEvents = [];

for (const event of events) {
  const eventId = event.id;
  const listingsQuery = `event_id=${eventId}`;
  const listingsSig = generateXSignature('GET', searchHost, listingsPath, listingsQuery);

  try {
    const listingsRes = await axios.get(`https://${searchHost}${listingsPath}?${listingsQuery}`, {
      headers: {
        'X-Token': VICTORY_API_TOKEN,
        'X-Signature': listingsSig,
        'Accept': 'application/json',
      }
    });

    const listings = listingsRes.data.listings ?? [];
    const prices = listings
      .map(l => Number(l.retail_price_inclusive ?? l.retail_price))
      .filter(p => !isNaN(p) && p > 0);

    enrichedEvents.push({
      event_id: eventId,
      name: event.name,
      date: event.occurs_at,
      venue: {
        name: event.venue?.name ?? '',
        location: event.venue?.location ?? '',
      },
      lowestPrice: prices.length ? Math.min(...prices) : null
    });
  } catch (listingErr) {
    console.warn(`⚠️ No listings for event ${eventId}:`, listingErr.message);
    enrichedEvents.push({
      event_id: eventId,
      name: event.name,
      date: event.occurs_at,
      venue: {
        name: event.venue?.name ?? '',
        location: event.venue?.location ?? '',
      },
      lowestPrice: null
    });
  }
}

res.json({ results: enrichedEvents });
  } catch (err) {
    console.error('❌ API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'API lookup failed' });
  }
});

export default router;