// apps/backend/src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import mainRouter from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api/v1', mainRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
