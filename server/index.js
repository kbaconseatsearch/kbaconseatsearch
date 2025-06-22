import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import ticketsRouter from './tickets-router.mjs';

dotenv.config({
  path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '.env')
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => res.json({ message: 'pong' }));
app.use(ticketsRouter);

app.listen(3001, () => console.log('✅ ticket-router running on http://localhost:3001'));