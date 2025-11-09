import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const BLANK_ADDRESS = {
    companyName: "",
    streetName: "",
    suburbName: "",
    state: "",
    postalCode: "",
    country: "Australia",
    phone: "",
    email: "",
};

/**
 * @param {object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Function to call to close the modal
 * @param {Function} props.onSave - Function to call with the saved Address object
 * @param {Address} props.initialAddress - The address to edit, or a blank one
 * @param {Address[]} props.savedAddresses - List of previously saved addresses
 */
export function ShippingDetailsForm({ isOpen, onClose, onSave, initialAddress, savedAddresses }) {
    const [formData, setFormData] = useState(initialAddress || BLANK_ADDRESS);

    useEffect(() => {
        setFormData(initialAddress || BLANK_ADDRESS);
    }, [initialAddress, isOpen]);

    if (!isOpen) {
        return null;
    }

    function handleFormChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSave(e) {
        e.preventDefault();
        onSave(formData);
    }

    function handleUseSaved(address) {
        setFormData(address);
    }

    return (
        // Modal Overlay
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-[550px] max-h-[750px] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold">Shipping Details</h2>
                    <button
                        type="button"
                        className="p-1 rounded-full text-gray-500 hover:bg-gray-200"
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>
                </header>
                <div className="p-4 overflow-y-auto">
                    {/* === Saved Addresses === */}
                    {savedAddresses.length > 0 && (
                        <div className="mb-2">
                            <h3 className="text-lg font-medium text-gray-800 mb-3">
                                Use a saved address
                            </h3>
                            <div className="space-y-2 max-h-40 overflow-y-auto border rounded-md p-3 bg-gray-50">
                                {savedAddresses.map((addr, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className="w-full text-left p-3 bg-white border rounded-md hover:bg-rose-50 hover:border-rose-300 transition-colors"
                                        onClick={() => handleUseSaved(addr)}
                                    >
                                        <div className="font-medium">{addr.streetName}</div>
                                        <div className="text-sm text-gray-600">
                                            {addr.suburbName}, {addr.state} {addr.postalCode}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* === New Address Form === */}
                    <h3 className="text-lg font-medium text-gray-800 mb-4 pt-2">
                        {savedAddresses.length > 0 ? "Or enter a new address" : "Enter address"}
                    </h3>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Company (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={formData.companyName}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="streetName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Street Address
                                </label>
                                <input
                                    type="text"
                                    id="streetName"
                                    name="streetName"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={formData.streetName}
                                    onChange={handleFormChange}
                                    placeholder="123 Main St"
                                />
                            </div>
                            <div>
                                <label htmlFor="suburbName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Suburb / City
                                </label>
                                <input
                                    type="text"
                                    id="suburbName"
                                    name="suburbName"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={formData.suburbName}
                                    onChange={handleFormChange}
                                    placeholder="Richmond"
                                />
                            </div>
                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                    State
                                </label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={formData.state}
                                    onChange={handleFormChange}
                                    placeholder="VIC"
                                />
                            </div>
                            <div>
                                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    id="postalCode"
                                    name="postalCode"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={formData.postalCode}
                                    onChange={handleFormChange}
                                    placeholder="3121"
                                />
                            </div>
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={formData.country}
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                    placeholder="021 123 4567"
                                />
                            </div>
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    placeholder="phill@email.com"
                                />
                            </div>
                        </div>
                        {/* Form Action Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="action-button-bg text-white px-6 py-2 rounded-lg font-bold  transition-colors w-full"
                            >
                                Save Details
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
}