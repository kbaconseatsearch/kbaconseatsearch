// server.js
console.log("👋 server.js started...");
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import ticketsRouter from './tickets-router.mjs';
import victoryRoutes from './victory.routes.mjs';

// ✅ Ensure correct __dirname in ES Module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env file from the project root
dotenv.config({ path: path.resolve(__dirname, '.env') });

// ✅ DEBUG logs to confirm environment variables
console.log('🔑 API Key:', process.env.VICTORY_LIVE_API_KEY);
console.log('🔐 Secret:', process.env.VICTORY_LIVE_SECRET);
console.log('🌐 Base URL:', process.env.VICTORY_LIVE_BASE_URL);

const app = express();
const PORT = 3001;

// ✅ Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// ✅ Mount routers
app.use('/api', victoryRoutes);   // Victory Live routes (e.g. /api/events/:id)
app.use('/', ticketsRouter);      // Legacy TEvo routes

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});