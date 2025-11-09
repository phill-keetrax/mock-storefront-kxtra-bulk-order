import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Minus, X } from 'lucide-react';
import { ShippingDetailsForm, BLANK_ADDRESS } from './ShippingDetailsForm.jsx';

function newId() {
    return '_' + Math.random().toString(36).substring(2, 9);
}

/**
 * @typedef {object} RecipientRow
 * @property {string} id - Unique identifier for the row
 * @property {string} sku - The product SKU (or ID)
 * @property {number} quantity - Quantity of the product for this recipient
 * @property {string} recipientName - Name of the recipient
 * @property {ShippingDetails} shippingDetails - Shipping address, phone, and email for the recipient
 * @property {string} giftMessage - Optional gift message
 * @property {string} email - Optional email address for the recipient
 * @property {string} phone - Optional phone number for the recipient
 * @property {number} totalPrice - Total price for this row (quantity * unit price)
 * @property {number} shippingCost - Shipping cost for this recipient (optional, can be added later)
 */


/**
 * @typedef {object} ShippingDetails
 * @property {string} companyName - Company name (optional)
 * @property {string} streetName - Street address
 * @property {string} suburbName - Suburb or city
 * @property {string} state - State or region
 * @property {string} postalCode - Postal code
 * @property {string} country - Country
 * @property {string} phone - Phone number (optional)
 * @property {string} email - Email address (optional)
 */

/**
 * @param {string} sku - The product SKU (or ID)
 * @returns {RecipientRow} A new recipient row object
 */
function createNewRecipient(sku, unitPrice) {
    const initialQuantity = 1;
    return {
        id: newId(),
        sku: sku,
        quantity: 1,
        recipientName: "",
        shippingAddress: { ...BLANK_ADDRESS },
        giftMessage: "",
        totalPrice: initialQuantity * unitPrice,
        shippingCost: 0,
    };
}


function App({ globalMethods, ...props }) {
    const [appProps, setAppProps] = useState(props);
    const [recipients, setRecipients] = useState([]);

    const [editingAddressIndex, setEditingAddressIndex] = useState(null);
    const [savedAddresses, setSavedAddresses] = useState([]);

    const productPrice = useMemo(() => {
        const priceInCents = appProps.variant?.price || appProps.product?.price || 0;

        return priceInCents / 100;
    }, [appProps.variant, appProps.product]);

    useEffect(() => {
        if (globalMethods) {
            globalMethods({
                getInititalOrderData: () => appProps,
                updateInititalOrderData: (newProps) => {
                    console.log('App received new data:', newProps);
                    setAppProps(newProps);
                }
            });
        }
    }, [globalMethods, appProps]);

    useEffect(() => {
        if (!appProps.initialQuantity || !appProps.variant) {
            return;
        }
        const initialRows = [];
        for (let i = 0; i < appProps.initialQuantity; i++) {
            // VARIANT ID as the SKU
            initialRows.push(createNewRecipient(appProps.variant.id, productPrice));
        }
        setRecipients(initialRows);

    }, [appProps, productPrice]);

    // --- Event Handlers ---
    function handleInputChange(index, fieldName, value) {
        const newRecipients = [...recipients];

        newRecipients[index][fieldName] = value;
        setRecipients(newRecipients);
    }

    function updateRecipientQuantity(index, newQuantity) {
        const validatedQuantity = Math.max(1, parseInt(newQuantity, 10) || 1);
        const newRecipients = [...recipients];

        newRecipients[index].quantity = validatedQuantity;
        newRecipients[index].totalPrice = validatedQuantity * productPrice;
        setRecipients(newRecipients);
    }

    function addRow() {
        if (!appProps.variant) return;
        const newRecipient = createNewRecipient(appProps.variant.id, productPrice);

        setRecipients([...recipients, newRecipient]);
    }

    function removeRow(idToRemove) {
        const newRecipients = recipients.filter((row) => row.id !== idToRemove);

        setRecipients(newRecipients);
    }

    function handleSubmit() {
        console.log("Submitting order:", recipients);
        console.log("For Product:", appProps.product, "Variant:", appProps.variant);
        // TODO figure this out
    }

    // ! ADDRESS HANDLERS
    /**
     * Called when the user clicks the "Shipping Address" button in the table row
     */
    function handleAddressCellClick(index) {
        setEditingAddressIndex(index);
    }

    /**
     * Called by the ShippingDetailsForm when the user saves a new or existing address
     */
    function handleAddressSave(newAddress) {
        if (editingAddressIndex === null) return;

        const newRecipients = [...recipients];

        newRecipients[editingAddressIndex].shippingAddress = newAddress;
        setRecipients(newRecipients);

        const isSaved = savedAddresses.some(
            (addr) =>
                addr.streetName === newAddress.streetName &&
                addr.postalCode === newAddress.postalCode
        );

        if (!isSaved && newAddress.streetName && newAddress.suburbName) {
            setSavedAddresses((prev) => [...prev, newAddress]);
        }
        setEditingAddressIndex(null);
    }

    // --- Memoized Calculations ---
    const totalQuantity = useMemo(() => {
        return recipients.reduce((total, row) => total + row.quantity, 0);
    }, [recipients]);

    const totalPrice = useMemo(() => {
        const sum = recipients.reduce((total, row) => total + row.totalPrice, 0);

        return Number(sum.toFixed(2));
    }, [recipients]);

    // --- Render ---
    if (!appProps.product || !appProps.variant) {
        return <div className="p-4">Loading product data...</div>;
    }

    return (
        <div className="w-full h-full p-2 text-gray-800">

            {/* === HEADER === */}
            <header className="mb-4 gap-2">
                <h1 className="text-3xl font-bold text-gray-900 mb-3 pb-3 border-b ">
                    Add Multiple Recipients
                </h1>
                <h2 className='text-xl text-gray-700'>
                    {appProps.product.title} - ${productPrice.toFixed(2)} each
                </h2>
                <div className="action-button-bg border border-rose-500 text-rose-800 p-2 mt-2 rounded-lg text-xs">
                    When sending items direct to your recipients, the below recipient
                    addresses will be used however, to complete the checkout, you will
                    still need to add an address (yours or your business address) in the
                    'shipping address' section on the next page.
                </div>
            </header>
            {/* === TABLE  === */}
            <section className="w-full mt-6">
                <div className="h-[265px] overflow-y-auto border border-gray-300">
                    <table className="w-full h-fit table-auto text-xs md:text-sm ">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 font-semibold text-center text-gray-600 border-b border-gray-300">#</th>
                                <th className="p-3 font-semibold text-center text-gray-600 border-b border-gray-300">Quantity</th>
                                <th className="p-3 font-semibold text-center text-gray-600 border-b border-gray-300">Recipient Name</th>
                                <th className="p-3 font-semibold text-center text-gray-600 border-b border-gray-300">Message</th>
                                <th className="p-3 font-semibold text-center text-gray-600 border-b border-gray-300">Shipping Details</th>
                                <th className="p-3 font-semibold text-center text-gray-600 border-b border-gray-300">Total</th>
                                <th className="p-3 font-semibold text-center text-gray-600 border-b border-gray-300">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipients.map((row, index) => (
                                <tr key={row.id} className='border-b border-gray-200 bg-white'>
                                    {/* ... (all the table cells are the same as before) ... */}
                                    {/* row # */}
                                    <td className="p-2 pt-4 text-center">{index + 1}</td>
                                    {/* quantity */}
                                    <td className="p-2">
                                        <input
                                            type="number"
                                            min="1"
                                            className="w-16 p-2 border border-gray-300 rounded-md text-center mb-0"
                                            value={row.quantity}
                                            onChange={(e) => updateRecipientQuantity(index, e.target.value)}
                                        />
                                    </td>
                                    {/* recipient name */}
                                    <td className="p-2 ">
                                        <input
                                            type="text"
                                            placeholder="Jane Doe"
                                            className="p-2 w-full border border-gray-300 rounded-md mb-0"
                                            value={row.recipientName}
                                            onChange={(e) => handleInputChange(index, 'recipientName', e.target.value)}
                                        />
                                    </td>
                                    {/* message */}
                                    <td className="p-2">
                                        <input
                                            type="text"
                                            placeholder="Happy Birthday!"
                                            className="w-full p-2 border border-gray-300 rounded-md mb-0"
                                            value={row.giftMessage}
                                            onChange={(e) => handleInputChange(index, 'giftMessage', e.target.value)}
                                        />
                                    </td>
                                    {/* shipping address */}
                                    <td className="p-2">
                                        {row.shippingAddress.streetName ? (
                                            // Requirement: Show only street name when filled
                                            <button
                                                type="button"
                                                className="w-full flex items-center justify-center gap-2 text-gray-500 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 border border-1 border-gray-400 transition-colors text-center mb-0"
                                                onClick={() => handleAddressCellClick(index)}
                                            >
                                                {row.shippingAddress.streetName}
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="w-full flex items-center justify-center gap-2 text-gray-500 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 border border-1 border-gray-400 transition-colors text-center mb-0"
                                                onClick={() => handleAddressCellClick(index)}
                                            >
                                                <Plus size={16} />
                                                Click here to add
                                            </button>
                                        )}
                                    </td>
                                    {/* line total */}
                                    <td className="p-2 pt-4 font-medium text-center">
                                        ${row.totalPrice.toFixed(2)}
                                    </td>
                                    {/* remove row */}
                                    <td className="p-2 font-medium text-center">
                                        <button
                                            className="bg-rose-700 text-white p-2 rounded-sm"
                                            onClick={() => removeRow(row.id)}
                                        >
                                            <X size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            {/* === FOOTER === */}
            <footer className="mt-4 pt-2 border-t border-gray-300 flex justify-between items-start flex-col sm:flex-row gap-4">
                <button
                    type="button"
                    className="flex items-center gap-2 text-gray-500 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 border border-1 border-gray-400 transition-colors"
                    onClick={addRow}
                >
                    <Plus size={18} />
                    Add Recipient
                </button>
                <div className="flex flex-col justify-between items-end">
                    <div className="text-right mb-4 sm:mb-0">
                        {/* --- TOTALS --- */}
                        <div className="text-2xl font-bold text-gray-900">
                            ESTIMATED TOTAL: ${totalPrice} + GST
                        </div>
                        <div className="text-sm text-gray-500">
                            Includes {recipients.length} Recipients (Excluding shipping)
                        </div>
                    </div>
                    {/* --- "COMPLETE ORDER" BUTTON --- */}
                    <button
                        type="button"
                        className="mt-4 action-button-bg text-white w-full sm:w-auto px-10 py-3 rounded-xl font-bold text-lg transition-colors"
                        onClick={handleSubmit}
                    >
                        Complete bulk order
                    </button>
                </div>
            </footer>
            <input
                type="hidden"
                id="bulkOrderHiddenJSON"
                name="bulkOrderData"
                value={JSON.stringify(recipients)}
                readOnly
            />
            {/* This renders the modal when editingAddressIndex is not null */}
            <ShippingDetailsForm
                isOpen={editingAddressIndex !== null}
                onClose={() => setEditingAddressIndex(null)}
                onSave={handleAddressSave}
                // Pass the correct address to edit, or a blank one if something's wrong
                initialAddress={
                    recipients[editingAddressIndex]?.shippingAddress || BLANK_ADDRESS
                }
                savedAddresses={savedAddresses}
            />
        </div>
    );
}

export default App;