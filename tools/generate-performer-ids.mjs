import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const API_TOKEN = process.env.VICTORY_LIVE_API_KEY;
const API_SECRET = process.env.VICTORY_LIVE_SECRET;
const searchHost = (process.env.VICTORY_LIVE_BASE_URL || 'api.ticketevolution.com').replace(/^https?:\/\//, '');const performersPath = path.resolve('./src/performers.json');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 👇 Inline the X-Signature generator
const generateXSignature = (method, host, path, query = '') => {
  const baseString = `${method.toUpperCase()}|${host.toLowerCase()}|${path}|${query}`;
  const hmac = crypto.createHmac('sha256', API_SECRET);
  hmac.update(baseString);
  return hmac.digest('hex');
};

// 👇 Name overrides (fallbacks for hard-to-find teams)
const nameOverrides = {
  "los angeles angels": ["angels", "anaheim angels"],
  "tampa bay rays": ["rays", "tampa rays"],
  "atlanta falcons": ["falcons"],
  "cleveland browns": ["cleveland browns", "browns", "cleveland nfl"],
  "montreal canadiens": ["canadiens", "montreal canadiens", "montreal", "canadians"],
  "chicago blackhawks": ["blackhawks", "black hawks"],
  "montreal canadiens": ["canadiens", "montreal", "canadians"]
};

const getPerformerId = async (teamName) => {
  const queryList = nameOverrides[teamName] || [teamName];

  for (const name of queryList) {
    const query = `q=${encodeURIComponent(name)}`;
    const sig = generateXSignature('GET', searchHost, '/v9/performers/search', query);

    try {
      const res = await axios.get(`https://${searchHost}/v9/performers/search?${query}`, {
        headers: {
          'X-Token': API_TOKEN,
          'X-Signature': sig,
          Accept: 'application/json'
        },
        timeout: 5000
      });

      const performer = res.data.performers?.[0];
      if (performer) return performer.id;
    } catch (err) {
      console.error(`⚠️  API error for "${name}":`, err.message);
    }
  }

  return null;
};

const run = async () => {
  const data = JSON.parse(await fs.readFile(performersPath, 'utf8'));
  const updated = {};

  for (const league of Object.keys(data)) {
    updated[league] = {};
    for (const team of Object.keys(data[league])) {
      if (data[league][team] !== null) {
        updated[league][team] = data[league][team]; // preserve existing ID
        continue;
      }

      console.log(`🔍 Looking up: ${team}`);
      const id = await getPerformerId(team);
      updated[league][team] = id;
      console.log(id ? `✅ ${team} → ${id}` : `❌ ${team} → not found`);
      await sleep(400);
    }
  }

  await fs.writeFile(performersPath, JSON.stringify(updated, null, 2));
  console.log('\n🎉 Updated performer IDs saved to src/performers.json');

  console.log('\n🟥 Teams still missing IDs:');
  for (const league of Object.keys(updated)) {
    for (const team of Object.keys(updated[league])) {
      if (updated[league][team] === null) {
        console.log(`- ${league} → ${team}`);
      }
    }
  }
};

run();