import React from 'react';

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'disabled';
  fullWidth?: boolean;
}

export const RetroButton: React.FC<RetroButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "px-6 py-3 font-bold text-sm uppercase transition-transform active:translate-y-1 active:shadow-none border-4 outline-none";
  const widthStyles = fullWidth ? "w-full" : "";
  
  let variantStyles = "";
  if (props.disabled || variant === 'disabled') {
    variantStyles = "bg-gray-300 border-gray-400 text-gray-500 shadow-[4px_4px_0px_0px_#9ca3af] cursor-not-allowed active:translate-y-0 active:shadow-[4px_4px_0px_0px_#9ca3af]";
  } else if (variant === 'primary') {
    variantStyles = "bg-pink-500 border-pink-700 text-white shadow-[4px_4px_0px_0px_#be185d] hover:bg-pink-400";
  } else {
    variantStyles = "bg-yellow-400 border-yellow-600 text-yellow-900 shadow-[4px_4px_0px_0px_#ca8a04] hover:bg-yellow-300";
  }

  return (
    <button 
      className={`${baseStyles} ${widthStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};