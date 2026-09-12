import { Router } from 'express';
import { getQuests, createQuest, toggleQuest, deleteQuest } from '../controllers/questController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect); // All quest routes require authentication

router.get('/', getQuests);
router.post('/', createQuest);
router.patch('/:id/toggle', toggleQuest);
router.delete('/:id', deleteQuest);

export default router;
