import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { addProduct } from '../controllers/productControllers.js';
import formidable from 'express-formidable';
import checkId from '../middleware/checkId.js';
const router = express.Router();

router.post('/', authenticate, isAdmin, formidable(), addProduct);

export default router;