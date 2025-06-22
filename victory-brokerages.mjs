import fetch from 'node-fetch';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.VICTORY_LIVE_API_KEY;
const apiSecret = process.env.VICTORY_LIVE_SECRET;

const method = 'GET';
const query = 'page=1&per_page=1'; // ✅ sorted query params
const endpointPath = 'api.sandbox.ticketevolution.com/v9/brokerages';
const url = `https://${endpointPath}?${query}`;
const stringToSign = `${method} ${endpointPath}?${query}`;

function generateVictorySignature(input, secret) {
  return crypto.createHmac('sha256', secret).update(input).digest('base64');
}

const signature = generateVictorySignature(stringToSign, apiSecret);

const headers = {
  'X-Token': apiKey,
  'X-Signature': signature,
  'Accept': 'application/json'
};

console.log('📛 API Token:', apiKey);
console.log('🔒 API Secret:', apiSecret ? 'Loaded ✅' : 'Missing ❌');
console.log('📄 String to Sign:', stringToSign);
console.log('🔐 X-Signature:', signature);
console.log('📡 Requesting:', url);

try {
  const response = await fetch(url, {
    method,
    headers
  });

  const data = await response.json();
  console.log('✅ Response Data:', JSON.stringify(data, null, 2));
} catch (error) {
  console.error('❌ Error fetching data:', error.message);
}