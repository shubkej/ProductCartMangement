import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice.js';
import ProductCard from '../components/ProductCard';
import {
  fetchCart,
} from '../store/slices/cartSlice.js';


const Home = () => {
  const dispatch = useDispatch();

  const { list: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length != 0) return
    
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-500">Loading products...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Trending Products
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
