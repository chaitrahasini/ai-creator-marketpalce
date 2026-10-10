import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const DB_FILE = path.join(__dirname, 'server-db.json');

app.use(cors());
app.use(express.json());

// Initialize backend JSON database file if not exists
const initialSeedData = {
  briefs: [
    {
      id: 'brief-1',
      brandName: 'Aura Tech Brand Studios',
      brandUsername: '@auratech_brand',
      brandLogo: '⚡',
      brandIndustry: 'AI Consumer Hardware',
      title: 'Generative Commercial Spot for Sora Hypercar',
      contentType: '30-second AI Video Commercial',
      aspectRatio: '16:9 4K',
      style: 'Cyberpunk Hyper-Photorealistic',
      budget: '$8,500',
      deadline: '7 Days',
      toolsRequired: ['Runway Gen-3', 'OpenAI Sora', 'ElevenLabs'],
      commercialUse: 'Full Worldwide Rights',
      description: 'Need a 30s high-octane commercial spot for our autonomous hypercar concept using Sora & Gen-3.',
      applicantsCount: 14,
      status: 'Open for Bids',
      createdAt: '2 hours ago'
    }
  ],
  messages: [
    {
      id: 'msg-demo-1',
      sender: 'aura tech',
      username: '@aura_tech',
      time: 'Just now',
      text: 'CONGRATULATIONS Elena Rostova! You have been selected by aura tech (@aura_tech) for our new Generative Commercial Brief! Please review campaign details in your Creator Messages.',
      isSelectionNotice: true
    }
  ],
  users: [
    { name: 'Elena Rostova', username: '@elena_ai', email: 'elena@gmail.com', role: 'creator' },
    { name: 'Aura Tech Brand', username: '@auratech_brand', email: 'auratech@gmail.com', role: 'brand' }
  ]
};

function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialSeedData, null, 2));
      return initialSeedData;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB:', err);
    return initialSeedData;
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing DB:', err);
  }
}

// REST API ENDPOINTS
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'Aura Market Backend API', port: PORT, timestamp: new Date().toISOString() });
});

// GET all briefs
app.get('/api/briefs', (req, res) => {
  const db = readDb();
  res.json(db.briefs || []);
});

// POST new brief
app.post('/api/briefs', (req, res) => {
  const db = readDb();
  const newBrief = {
    id: `brief-server-${Date.now()}`,
    ...req.body,
    createdAt: 'Just now'
  };
  db.briefs = [newBrief, ...(db.briefs || [])];
  writeDb(db);
  res.status(201).json({ success: true, brief: newBrief });
});

// GET messages
app.get('/api/messages', (req, res) => {
  const db = readDb();
  res.json(db.messages || []);
});

// POST brand selection notice / message
app.post('/api/messages', (req, res) => {
  const db = readDb();
  const newMsg = {
    id: `msg-server-${Date.now()}`,
    time: 'Just now',
    ...req.body
  };
  db.messages = [newMsg, ...(db.messages || [])];
  writeDb(db);
  res.status(201).json({ success: true, message: newMsg });
});

// AUTH Login / Signup Persistence
app.post('/api/auth/login', (req, res) => {
  const { email, username, role } = req.body;
  const db = readDb();
  let user = db.users.find(u => u.email === email || u.username === username);
  if (!user) {
    user = { name: username.replace('@', ''), username, email, role: role || 'creator' };
    db.users.push(user);
    writeDb(db);
  }
  res.json({ success: true, user });
});

app.listen(PORT, () => {
  console.log(`🚀 Aura AI Marketplace Backend Server running on http://localhost:${PORT}`);
});
