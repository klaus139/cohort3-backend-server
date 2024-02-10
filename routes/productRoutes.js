import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { addProduct, addProductReview, fetchAllProducts, fetchNewProduct, fetchProduct, fetchProductById, fetchTopProduct, removeProduct, updateProduct } from '../controllers/productControllers.js';
import formidable from 'express-formidable';
import checkId from '../middleware/checkId.js';
const router = express.Router();

router.post('/', authenticate, isAdmin, formidable(), addProduct);

router.put('/:id', authenticate, isAdmin, formidable(), updateProduct);

router.delete('/:id', authenticate, isAdmin, removeProduct);

router.get('/', fetchProduct);

router.get('/all-products', fetchAllProducts);

router.get('/product/:id', fetchProductById);

router.post('/:id/reviews', authenticate, isAdmin, addProductReview);

router.get('/top-products', fetchTopProduct);

router.get('/new-products', fetchNewProduct);

export default router;