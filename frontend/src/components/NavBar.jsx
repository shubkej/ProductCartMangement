import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { cartTotalItems } from '../store/slices/cartSlice';

function NavBar() {
    const totalQuantity = useSelector(cartTotalItems);
    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <h2 className="text-white text-2xl font-bold">Shopping</h2>
            <div className="flex items-center space-x-4">
                <Link
                    to="/"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                    Home
                </Link>
                <Link
                    to="/cart"
                    className="relative text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                    Cart({totalQuantity})
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;
