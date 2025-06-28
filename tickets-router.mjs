import express from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';
import axios from 'axios';
import fs from 'fs/promises';

dotenv.config();
const router = express.Router();

const VICTORY_API_TOKEN = process.env.VICTORY_LIVE_API_KEY;
const VICTORY_API_SECRET = process.env.VICTORY_LIVE_SECRET;

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


// ✅ Search Events by Team (now uses performers.json for fast lookup)
router.get('/api/events/search', async (req, res) => {
  try {
    const { team, start, end } = req.query;
    if (!team) return res.status(400).json({ error: 'Missing team parameter' });

const searchHost = (process.env.VICTORY_LIVE_BASE_URL || 'api.ticketevolution.com').replace(/^https?:\/\//, '');
    // 🔍 Load performers.json dynamically
    const jsonData = await fs.readFile('./src/performers.json', 'utf-8');
    const performerMap = JSON.parse(jsonData);

// Flatten the performer map for direct lookup
const flatMap = {};
for (const league of Object.keys(performerMap)) {
  Object.entries(performerMap[league]).forEach(([name, id]) => {
    flatMap[name.toLowerCase()] = id;
  });
}

const input = team.toLowerCase();
let performerId = flatMap[input] ?? null;

// If no exact match, try fuzzy match
if (!performerId) {
  for (const [name, id] of Object.entries(flatMap)) {
    if (name.includes(input)) {
      performerId = id;
      break;
    }
  }
}

    if (!performerId) {
console.log(`❌ No performer ID found for "${input}"`);      return res.json({ results: [] });
    }

    // Step 2: Search Events
    const eventPath = '/v9/events/search';
    const queryObj = { performer_id: performerId };
    if (start) queryObj['occurs_at.gte'] = start;
    if (end) queryObj['occurs_at.lte'] = end;

    const pageNum = parseInt(req.query.page || '1');
    const eventQuery = Object.entries({
      ...queryObj,
      page: pageNum,
      per_page: 10
    })
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

    // Step 3: Add Listings Info (faster with Promise.all)
    const listingsPath = '/v9/listings';

    const enrichedEvents = await Promise.all(events.map(async (event) => {
      const eventId = event.id;
const listingsQuery = `event_id=${eventId}&include_tevo_section_mappings=true`;      const listingsSig = generateXSignature('GET', searchHost, listingsPath, listingsQuery);

      try {
        const listingsRes = await axios.get(`https://${searchHost}${listingsPath}?${listingsQuery}`, {
          headers: {
            'X-Token': VICTORY_API_TOKEN,
            'X-Signature': listingsSig,
            'Accept': 'application/json',
          }
        });

        const listings = listingsRes.data.listings ?? listingsRes.data.ticket_groups ?? [];
        const prices = listings
          .map(l => Number(l.retail_price_inclusive ?? l.retail_price))
          .filter(p => !isNaN(p) && p > 0);

        return {
          event_id: eventId,
          name: event.name,
          date: event.occurs_at_local ?? event.occurs_at,
          venue: {
  name: event.venue?.name ?? '',
  location: event.venue?.location ?? '',
  time_zone: event.venue?.time_zone ?? null,
},
          configuration: event.configuration,
          lowestPrice: prices.length ? Math.min(...prices) : null
        };
      } catch (err) {
        console.warn(`⚠️ No listings for event ${eventId}: ${err.message}`);
        return {
          event_id: eventId,
          name: event.name,
          date: event.occurs_at_local,
          venue: {
  name: event.venue?.name ?? '',
  location: event.venue?.location ?? '',
  time_zone: event.venue?.time_zone ?? null,
},
          configuration: event.configuration,
          lowestPrice: null
        };
      }
    }));

    res.json({ results: enrichedEvents });

  } catch (err) {
    console.error('❌ API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'API lookup failed' });
  }
});

// ✅ Listings route (raw ticketGroups for seat map)
router.get('/api/events/:id/listings', async (req, res) => {
  const eventId = req.params.id;
  const searchHost = (process.env.VICTORY_LIVE_BASE_URL || 'api.ticketevolution.com').replace(/^https?:\/\//, '');
  const listingsPath = '/v9/listings';
const listingsQuery = `event_id=${eventId}`;  const fullUrl = `https://${searchHost}${listingsPath}?${listingsQuery}`;
  const sig = generateXSignature('GET', searchHost, listingsPath, listingsQuery);

  console.log(`🔍 Trying: ${fullUrl}`);
  console.log(`🔐 Signature: ${sig}`);

  try {
    const listingsRes = await axios.get(fullUrl, {
      headers: {
        'X-Token': VICTORY_API_TOKEN,
        'X-Signature': sig,
        'Accept': 'application/json',
      }
    });

    const rawListings = listingsRes.data.listings ?? listingsRes.data.ticket_groups ?? [];
console.log(rawListings[0]); // 👈 check if brokerage_id is present
    console.log(`🎟️ Found ${rawListings.length} listings for event ${eventId}`);
    res.json({ listings: rawListings }); // ✅ Important: keep raw for seat map
  } catch (err) {
    console.error(`❌ Listings fetch failed for event ${eventId}:`, err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch ticket listings' });
  }
});

    
// ✅ Full event details route
router.get('/api/events/:id', async (req, res) => {
  const eventId = req.params.id;
const searchHost = (process.env.VICTORY_LIVE_BASE_URL || 'api.ticketevolution.com').replace(/^https?:\/\//, '');  const eventPath = `/v9/events/${eventId}`;
  const eventSig = generateXSignature('GET', searchHost, eventPath);

  try {
    const eventRes = await axios.get(`https://${searchHost}${eventPath}`, {
      headers: {
        'X-Token': VICTORY_API_TOKEN,
        'X-Signature': eventSig,
        'Accept': 'application/json',
      }
    });

    const event = eventRes.data.event ?? eventRes.data;
    res.json(event); // ✅ ALWAYS return the event object itself
  } catch (err) {
    console.error(`❌ Failed to fetch event ${eventId}:`, err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch event details' });
  }
});

// ✅ Basic route to return brokerage ID → name map
router.get('/api/brokerages', async (req, res) => {
  const searchHost = (process.env.VICTORY_LIVE_BASE_URL || 'api.ticketevolution.com')
    .replace(/^https?:\/\//, '');

  const path = '/v9/brokerages';
  const sig = generateXSignature('GET', searchHost, path);
  const fullUrl = `https://${searchHost}${path}?per_page=100`;

  try {
    const brokerRes = await axios.get(fullUrl, {
      headers: {
        'X-Token': VICTORY_API_TOKEN,
        'X-Signature': sig,
        'Accept': 'application/json',
      }
    });

    const brokerages = brokerRes.data.brokerages?.map(b => ({
      id: b.id,
      name: b.name,
    })) || [];

    res.json({ brokerages });
  } catch (err) {
    console.error('❌ Failed to fetch brokerages:', err.message);
    res.status(500).json({ error: 'Failed to fetch brokerages' });
  }
});

export default router;