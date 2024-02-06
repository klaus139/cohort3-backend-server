import express from 'express';
import { allCategories, createCategory, deleteCategory, getCategoryById, updateCategory } from '../controllers/categoryControllers.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

router.post('/', authenticate, isAdmin, createCategory);

router.put('/:categoryId', authenticate, isAdmin, updateCategory);

router.get('/:id',getCategoryById);

router.get('/', allCategories);

router.delete('/:categoryId', authenticate, isAdmin, deleteCategory);



export default router;