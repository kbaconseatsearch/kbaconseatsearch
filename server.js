import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ticketsRouter from './tickets-router.mjs';
import victoryRoutes from './victory.routes.mjs';

dotenv.config();

// 🔍 DEBUG ENV
console.log('🔑 API Key:', process.env.VICTORY_LIVE_API_KEY);
console.log('🔐 Secret:', process.env.VICTORY_LIVE_SECRET);
console.log('🌐 Base URL:', process.env.VICTORY_LIVE_BASE_URL);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api', victoryRoutes); // ✅ NEW: /api/brokerages (Victory)
app.use('/', ticketsRouter); // ✅ Existing ticket routes

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});