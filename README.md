# Shopify Embedded React App - Local Dev Environment

This project provides a local development environment for building and testing a React application designed to be embedded as a widget within a Shopify store.

It uses Vite for a fast, modern development experience with Hot Module Replacement (HMR).

## How it Works

Instead of running inside Shopify, we use a local index.html file to act as a "mock" or "simulator" of the Shopify page.

- main.jsx: This is the app's entry point. It does not render the app immediately. Instead, it attaches a function (window.mountKXtraBulkOrderApp) to the global window object.

- index.html: This file mimics a Shopify page. It includes a container <div id="bulk-order-app"> and a script that calls window.mountKXtraBulkOrderApp with mock data (MOCK_PROPS).

- App.jsx: This is your actual React application. It receives the mock data as props.

This setup allows you to develop your React app in isolation, with live-reloading, before deploying it to Shopify.

## Setup

Clone or download the project files.

Install the necessary Node.js dependencies:

```bash
npm install
```

Development

To start the local development server:

```bash
npm run dev
```

This will start the Vite server (usually at http://localhost:5173). Open this URL in your browser.


You will see the index.html page with your React app mounted inside it. Any changes you make to App.jsx, main.jsx, or other component files will be reflected in the browser instantly thanks to Hot Module Replacement (HMR).


## Simulating Shopify Data

To test your app with different product data, variants, or quantities:

1. Open the index.html file.

2. Find the <script> block at the bottom.

3. Modify the MOCK_PROPS object with the data you want to test.

```javascript
// --- Your Mock Data ---
const MOCK_PROPS = {
  initialQuantity: 5, // Change this
  product: {
    id: 12345,
    title: "A Different Product", // Change this
    price: 9900 
  },
  variant: {
    id: 67890,
    title: "Small / Blue", // Change this
    price: 9900
  }
};
```

4. Save index.html. The browser will automatically reload with the new props.

## Building for Production
I usually copy and paste into the [EB kxtra-bulk-recipients repo](https://github.com/Keetrax/kxtra-bulk-recipients-order-app) and build, but we can also build from this repo. When you are ready to build the final JavaScript file for Shopify:
```bash
npm run build
```

This will create a dist folder containing the optimized, minified, and bundled JavaScript and CSS files. You will upload these files (or the output JS) to your Shopify theme assets or app hosting.
