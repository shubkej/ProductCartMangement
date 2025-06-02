import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCart,
    updateCartItem,
    removeCartItem
} from '../store/slices/cartSlice.js';
import { fetchProducts } from '../store/slices/productSlice.js';
import {
    submitCheckout,
    updateFormData
} from '../store/slices/checkOutSlice.js';
import ProceedToCheckoutModal from '../components/ProceedToCheckoutModal.jsx';

const Cart = () => {
    const dispatch = useDispatch(); 
    const [showModal, setShowModal] = useState(false);

    const { items: cartItems, status: cartStatus } = useSelector(state => state.cart);
    const { list: products} = useSelector((state) => state.products);
    const { formData, status: checkoutStatus } = useSelector(state => state.checkout);

    console.log('products', products);
    console.log('cartItems', cartItems);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const findProduct = (productId) => products.find(p => p.id === productId);

    const handleQuantityChange = (productId, qty) => {
        if (qty < 1) return;
        dispatch(updateCartItem({ productId, quantity: qty }));
    };

    const handleRemove = (productId) => {
        dispatch(removeCartItem(productId));
    };

    const handleInputChange = (e) => {
        dispatch(updateFormData({ [e.target.name]: e.target.value }));
    };

    const handleCheckoutSubmit = () => {
        const totalPrice = cartItems.reduce((sum, item) => {
            const product = findProduct(item.productId);
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);

        dispatch(submitCheckout({ ...formData, cartItems, totalPrice }))
            .unwrap()
            .then(() => {
                alert('Order placed successfully!');
                setShowModal(false);
            })
            .catch(() => alert('Checkout failed'));
    };

    const totalPrice = useMemo(() =>
        cartItems.reduce((sum, item) => {
            const product = findProduct(item.productId);
            return sum + (product ? product.price * item.quantity : 0);
        }, 0), [cartItems, products]);

    if (cartStatus === 'loading') return <p>Loading cart...</p>;
    if (!cartItems.length) return <p>Your cart is empty.</p>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="text-2xl font-semibold mb-4 bg-amber-400 px-4 py-2 rounded-xl cursor-pointer"
                >
                    Proceed to Checkout
                </button>
            </div>

            <table className="w-full border-collapse border border-gray-300 mb-6">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Product</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Quantity</th>
                        <th className="border p-2">Total</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(({ productId, quantity }) => {
                        const product = findProduct(productId);
                        if (!product) return null;

                        return (
                            <tr key={productId} className="hover:bg-gray-50">
                                <td className="border p-2 flex items-center gap-4">
                                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                                    <span>{product.name}</span>
                                </td>
                                <td className="border p-2 text-center">${product.price.toFixed(2)}</td>
                                <td className="border p-2 text-center">
                                    <div className="inline-flex items-center space-x-2">
                                        <button onClick={() => handleQuantityChange(productId, quantity - 1)} disabled={quantity <= 1} className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50">-</button>
                                        <span>{quantity}</span>
                                        <button onClick={() => handleQuantityChange(productId, quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                                    </div>
                                </td>
                                <td className="border p-2 text-center">${(product.price * quantity).toFixed(2)}</td>
                                <td className="border p-2 text-center">
                                    <button onClick={() => handleRemove(productId)} className="text-red-600 hover:text-red-800">Remove</button>
                                </td>
                            </tr>
                        );
                    })}
                    <tr className="font-bold bg-gray-100">
                        <td className="border p-2 text-right" colSpan="3">Total</td>
                        <td className="border p-2 text-center">${totalPrice.toFixed(2)}</td>
                        <td className="border p-2"></td>
                    </tr>
                </tbody>
            </table>

            <ProceedToCheckoutModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleCheckoutSubmit}
                formData={formData}
                onChange={handleInputChange}
                loading={checkoutStatus === 'loading'}
            />
        </div>
    );
};

export default Cart;
