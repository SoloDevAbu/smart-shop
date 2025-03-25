// apps/backend/src/routes/product.ts
import express from 'express';
import { getProduct, updateProduct } from '@repo/agents/ProductAgent';

const router = express.Router();

// Retrieve product details by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product: ', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Update product details (e.g., inventory)
router.post('/update', async (req, res) => {
  try {
    const { id, data } = req.body;
    await updateProduct(id, data);
    res.json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product: ', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
