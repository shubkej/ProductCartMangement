import express from 'express';
import {getCart,addToCart,updateCartItem,removeFromCart,clearCart} from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/getCart', getCart);
router.post('/addToCart', addToCart);
router.put('/:productId', updateCartItem);
router.delete('/:productId', removeFromCart);
router.delete('/', clearCart);

export default router;
