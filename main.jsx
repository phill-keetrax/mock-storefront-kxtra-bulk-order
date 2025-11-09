import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const roots = new Map();

const setGlobalMethods = (methods) => {
  window.BulkOrderModal = methods;
};

window.mountKXtraBulkOrderApp = (container, props) => {
  if (roots.has(container)) {
    roots.get(container).unmount();
  }
  
  const root = createRoot(container);
  roots.set(container, root);

  root.render(
    <StrictMode>
      <App globalMethods={setGlobalMethods} {...props}/>
    </StrictMode>
  );
};

// ? unmount
// window.KXtraBulkOrderApp = (container) => {
//   if (roots.has(container)) {
//     roots.get(container).unmount();
//     roots.delete(container);
//   }
// };
