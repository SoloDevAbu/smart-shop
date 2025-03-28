import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ message, type, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`${
          type === 'success' 
            ? 'bg-green-500' 
            : 'bg-red-500'
        } text-white px-6 py-3 rounded-lg shadow-lg flex items-center`}
      >
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  );
};