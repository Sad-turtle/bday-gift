import React from 'react';
import { RetroButton } from './RetroButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border-4 border-yellow-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] p-6 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6 border-b-4 border-pink-100 pb-4">
          <h2 className="text-xl text-pink-600 leading-tight">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-pink-500 text-xl ml-4"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          {children}
        </div>

        {/* Footer (Close button if needed, usually handled inside children but nice to have) */}
        <div className="text-center">
          <RetroButton onClick={onClose} variant="secondary">
            Close
          </RetroButton>
        </div>
      </div>
    </div>
  );
};