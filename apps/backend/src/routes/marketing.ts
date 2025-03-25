// apps/backend/src/routes/marketing.ts
import express from 'express';
import { triggerPromotion } from '@repo/agents/MarketingAgent';

const router = express.Router();

router.post('/promotion', async (req, res) => {
  try {
    const { campaignData } = req.body;
    await triggerPromotion(campaignData);
    res.json({ success: true, message: 'Promotion triggered successfully' });
  } catch (error) {
    console.error('Error triggering promotion: ', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
