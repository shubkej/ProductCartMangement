import React, { useState } from 'react';
import axios from 'axios';
import { addToCart } from '../store/slices/cartSlice';
import { useDispatch } from 'react-redux';

const ProductCard = ({ product }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();

    const handleAddToCart = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await dispatch(addToCart({ productId: product.id })).unwrap();
            setSuccess(true);
        } catch (err) {
            setError('Failed to add product to cart');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-2">
            <img
                alt={product.name}
                src={product.image}
                className="aspect-square w-full object-cover group-hover:opacity-90"
            />
            <div className="p-4 flex flex-col justify-between h-48">
                <div>
                    <h3 className="text-sm text-gray-700 font-semibold">{product.name}</h3>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">{product.description}</p>
                    {product.color && (
                        <p className="mt-1 text-xs text-gray-400 italic">{product.color}</p>
                    )}
                </div>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                    <button
                        onClick={handleAddToCart}
                        disabled={loading}
                        className={`ml-4 px-3 py-1 rounded text-white text-sm font-semibold
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {loading ? 'Adding...' : 'Add to Cart'}
                    </button>
                </div>
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                {success && <p className="text-green-600 text-xs mt-1">Added to cart!</p>}
            </div>
        </div>
    );
};

export default ProductCard;
