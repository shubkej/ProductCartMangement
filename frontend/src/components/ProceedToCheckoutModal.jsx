import React from 'react';
const ProceedToCheckoutModal = ({ isOpen, onClose, onSubmit, formData, onChange }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Checkout Information</h2>
                <div className="mb-2">
                    <label className="block font-semibold">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={onChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="mb-2">
                    <label className="block font-semibold">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={onChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={onChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Confirm Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProceedToCheckoutModal;
