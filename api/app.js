import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';
import connetDB from './config/db.js';
import userRoute from './routes/userRoutes.js';

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 8000;

const DB_URl =
  'mongodb+srv://rajangupta8472:HnSUMs1MvxQrOYgy@cluster0.aqntjnl.mongodb.net/ecom';

// DB connection
connetDB(DB_URl);

app.get('/', (req, res) => {
  res.send('Server is running...');
});

// loads Routes
app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());

app.use('/api/v1', userRoute);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
