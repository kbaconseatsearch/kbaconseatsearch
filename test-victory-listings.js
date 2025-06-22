import dotenv from 'dotenv';
import crypto from 'crypto';
import fetch from 'node-fetch';

dotenv.config();

const eventId = '2861956';
const path = `/v9/listings?event_id=${eventId}`;
const baseUrl = 'https://api.sandbox.ticketevolution.com';

const signature = crypto
  .createHmac('sha256', process.env.VICTORY_LIVE_SECRET)
  .update(`GET api.sandbox.ticketevolution.com${path}`)
  .digest('base64');

const url = `${baseUrl}${path}`;

fetch(url, {
  headers: {
    'X-Token': process.env.VICTORY_LIVE_API_KEY,
    'X-Signature': signature,
    'Accept': 'application/json',
  },
})
  .then(res => res.json())
  .then(data => {
    console.log('🎟️ Victory Listings Data:', data);
  })
  .catch(err => {
    console.error('❌ API call failed:', err.message);
  });