import express from 'express';
import cors from 'cors';
import submitRoute from './routes/submit.route.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/",submitRoute);

app.listen(3000, () => {
  console.log('Server running on http://localhost:5173');
});