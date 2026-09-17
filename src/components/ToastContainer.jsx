/* ==========================================================================
   AURA E-COMMERCE PLATFORM - REACT TOAST CONTAINER COMPONENT
   ========================================================================== */

import React from 'react';
import { useStore } from '../context/StoreContext.jsx';

export default function ToastContainer() {
  const { toasts } = useStore();

  if (!toasts || toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return 'fa-solid fa-circle-check';
      case 'error':
        return 'fa-solid fa-circle-exclamation';
      case 'warning':
        return 'fa-solid fa-triangle-exclamation';
      default:
        return 'fa-solid fa-circle-info';
    }
  };

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type || 'info'} animate-toast`}>
          <i className={getIcon(toast.type)}></i>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
