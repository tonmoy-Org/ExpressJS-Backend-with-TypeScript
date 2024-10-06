import { Router } from 'express';
import { createProduct, getProduct, updateProduct, deleteProduct } from '../controllers/productController';

const router = Router();


router.get('/products/:id', getProduct);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
