import { Router } from 'express';
import mongoose from 'mongoose';
import authRoutes from './authRoutes.js';
import questRoutes from './questRoutes.js';
import shopRoutes from './shopRoutes.js';

const router = Router();

// Sub-routes
router.use('/auth', authRoutes);
router.use('/quests', questRoutes);
router.use('/shop', shopRoutes);
router.use('/inventory', shopRoutes);

router.get('/health', (req, res) => {
  const dbStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const dbStatus = dbStates[mongoose.connection.readyState] || 'unknown';

  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'LifeBuild Backend API',
    database: {
      status: dbStatus,
      readyState: mongoose.connection.readyState
    }
  });
});

export default router;

