import React from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item ${toast.type}`}>
          <div style={{ flexShrink: 0 }}>
            {toast.type === 'error' && <AlertCircle size={20} color="#ef4444" />}
            {toast.type === 'info' && <Info size={20} color="#3b82f6" />}
            {toast.type === 'success' && <CheckCircle2 size={20} color="#c5a059" />}
          </div>
          <div style={{ flexGrow: 1, fontSize: '0.85rem' }}>
            {toast.message}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            style={{ color: '#9e9a90', padding: '4px', cursor: 'pointer', display: 'flex' }}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
