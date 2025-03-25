// apps/backend/src/routes/customer.ts
import express from 'express';
import { logCustomerActivity } from '@repo/agents/CustomerAgent';

const router = express.Router();

router.post('/log', async (req, res) => {
  try {
    const { userId, activity } = req.body;
    await logCustomerActivity(userId, activity);
    res.json({ success: true, message: 'Activity logged successfully' });
  } catch (error) {
    console.error('Error logging customer activity: ', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
