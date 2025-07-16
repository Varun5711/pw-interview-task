import express from 'express';
import cors from 'cors';
import { addRow } from './config/sheet.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/submit', async (req, res) => {
  try {
    const { fullName, address, mobile, email, gender } = req.body;

    if (!fullName || !address || !mobile || !email || !gender) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    await addRow([fullName, address, mobile, email, gender]);

    res.status(200).json({ success: true, message: 'Data added to sheet' });
  } catch (error) {
    console.error("Error adding row:", error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:5173');
});