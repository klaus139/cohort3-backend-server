import express from 'express';
import { createCategory } from '../controllers/categoryControllers.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

router.post('/', authenticate, isAdmin, createCategory);

export default router;