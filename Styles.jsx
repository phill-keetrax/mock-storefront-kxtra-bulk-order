export const GlobalStyles = () => (
  <style>{`
    /* --- kxtra-bulk-order --- */
    
    /* Base container */
    .kxtra-bulk-order__container {
      /* Using a common system font stack */
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      border-radius: 0.5rem;
      padding: 1rem;
    }

    /* Section wrapper */
    .kxtra-bulk-order__section {
      overflow-x: auto;
      margin-top: 1.5rem; /* mt-6 */
    }

    /* Scroll wrapper */
    .kxtra-bulk-order__scroll-wrapper {
      min-width: 1024px;
    }

    /* Table */
    .kxtra-bulk-order__table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem; /* 14px - text-sm */
      line-height: 1.25rem;
    }

    .kxtra-bulk-order__thead {
      /* No specific styles needed */
    }

    .kxtra-bulk-order__thead-tr {
      background-color: #f3f4f6; /* bg-gray-100 */
    }

    .kxtra-bulk-order__th {
      padding: 0.75rem; /* p-3 */
      font-weight: 600; /* font-semibold */
      text-align: center;
      color: #4b5563; /* text-gray-600 */
      border-bottom: 1px solid #d1d5db; /* border-b border-gray-300 */
      white-space: nowrap;
    }
    
    .kxtra-bulk-order__tbody {
      /* No specific styles needed */
    }

    /* This is your requested kxtra-bulk-order__tr */
    .kxtra-bulk-order__tr {
      border-bottom: 1px solid #e5e7eb; /* border-b border-gray-200 */
      background-color: #ffffff; /* bg-white */
    }
    
    .kxtra-bulk-order__tr:last-child {
      border-bottom: none;
    }

    /* Base Table Cell */
    .kxtra-bulk-order__td {
      padding: 0.5rem; /* p-2 */
      vertical-align: top; /* align-top */
    }
    
    /* Cell Modifiers */
    .kxtra-bulk-order__td--pt-4 {
      padding-top: 1rem;
    }
    
    .kxtra-bulk-order__td--text-center {
      text-align: center;
    }
    
    .kxtra-bulk-order__td--font-medium {
      font-weight: 500;
    }
    
    .kxtra-bulk-order__td--remove-cell {
       padding: 0.5rem;
       font-weight: 500;
       text-align: center;
       vertical-align: middle;
    }

    /* Quantity Input */
    .kxtra-bulk-order__quantity-wrapper {
      display: flex;
      align-items: center;
      border: 1px solid #d1d5db; /* border-gray-300 */
      border-radius: 0.375rem; /* rounded-md */
      width: 6rem; /* w-24 */
    }

    .kxtra-bulk-order__quantity-btn {
      padding: 0.5rem; /* p-2 */
      color: #4b5563; /* text-gray-600 */
      background-color: transparent;
      border: none;
      cursor: pointer;
      transition: background-color 0.15s ease-in-out;
    }
    
    .kxtra-bulk-order__quantity-btn:hover {
      background-color: #f3f4f6; /* hover:bg-gray-100 */
    }
    
    .kxtra-bulk-order__quantity-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .kxtra-bulk-order__quantity-btn--minus {
      border-top-left-radius: 0.375rem;
      border-bottom-left-radius: 0.375rem;
    }
    
    .kxtra-bulk-order__quantity-btn--plus {
      border-top-right-radius: 0.375rem;
      border-bottom-right-radius: 0.375rem;
    }

    .kxtra-bulk-order__quantity-input {
      width: 100%;
      text-align: center;
      padding: 0.5rem; /* p-2 */
      border-left: 1px solid #d1d5db;
      border-right: 1px solid #d1d5db;
      border-top: none;
      border-bottom: none;
      outline: none;
      appearance: textfield;
      -moz-appearance: textfield;
    }
    
    .kxtra-bulk-order__quantity-input::-webkit-outer-spin-button,
    .kxtra-bulk-order__quantity-input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* General Input */
    .kxtra-bulk-order__input {
      width: 100%;
      padding: 0.5rem; /* p-2 */
      border: 1px solid #d1d5db; /* border-gray-300 */
      border-radius: 0.375rem; /* rounded-md */
      box-sizing: border-box; /* Ensures padding doesn't break layout */
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    
    .kxtra-bulk-order__input:focus {
       outline: none;
       border-color: #f472b6; /* A pink-400 equivalent */
       box-shadow: 0 0 0 1px #f472b6;
    }

    /* Address Button */
    .kxtra-bulk-order__address-btn {
      width: 100%;
      padding: 0.5rem;
      height: 42px; /* h-[42px] */
      border: 1px solid #d1d5db; /* border-gray-300 */
      border-radius: 0.375rem; /* rounded-md */
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      background-color: #ffffff;
      transition: background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    
    .kxtra-bulk-order__address-btn:hover {
      background-color: #f9fafb; /* hover:bg-gray-50 */
    }
    
    .kxtra-bulk-order__address-btn:focus {
      outline: none;
      border-color: #f472b6;
      box-shadow: 0 0 0 2px #f472b6; /* focus:ring-2 focus:ring-pink-400 */
    }

    .kxtra-bulk-order__address-text--filled {
      color: #1f2937; /* text-gray-800 */
    }

    .kxtra-bulk-order__address-text--placeholder {
      color: #9ca3af; /* text-gray-400 */
    }
    
    /* Remove Button */
    .kxtra-bulk-order__remove-btn {
      background-color: #be123c; /* bg-rose-700 */
      color: #ffffff;
      padding: 0.5rem; /* p-2 */
      border-radius: 0.125rem; /* rounded-sm */
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.15s ease-in-out;
    }
    
    .kxtra-bulk-order__remove-btn:hover {
      background-color: #9f1239; /* rose-800 */
    }
  `}
  </style>
);