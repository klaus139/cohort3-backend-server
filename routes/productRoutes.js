import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { addProduct, fetchProduct, removeProduct, updateProduct } from '../controllers/productControllers.js';
import formidable from 'express-formidable';
import checkId from '../middleware/checkId.js';
const router = express.Router();

router.post('/', authenticate, isAdmin, formidable(), addProduct);

router.put('/:id', authenticate, isAdmin, formidable(), updateProduct);

router.delete('/:id', authenticate, isAdmin, removeProduct);

router.get('/', fetchProduct);

export default router;