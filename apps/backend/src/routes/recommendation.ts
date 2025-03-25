// apps/backend/src/routes/recommendation.ts
import express from 'express';
import { generateRecommendations } from '@repo/agents/CustomerAgent';

const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const recommendations = await generateRecommendations(req.params.userId);
    res.json({ success: true, recommendations });
  } catch (error) {
    console.error('Error generating recommendations: ', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
