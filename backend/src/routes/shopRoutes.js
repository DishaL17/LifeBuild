import { Router } from 'express';
import { getShopItems, buyItem, getInventory, useItem } from '../controllers/shopController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Shop routes
router.get('/items', getShopItems);
router.post('/buy', protect, buyItem);

// Inventory routes (accessible via /api/shop/inventory OR /api/inventory)
router.get('/inventory', protect, getInventory);
router.post('/inventory/use', protect, useItem);
router.get('/', protect, getInventory);
router.post('/use', protect, useItem);

export default router;
