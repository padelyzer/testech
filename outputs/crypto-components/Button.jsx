import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick,
  className = '',
  ...props 
}) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transform active:scale-95';
  
  const variants = {
    primary: 'bg-[#E3FD72] text-black hover:bg-[#d5ed62] focus:ring-[#E3FD72] hover:shadow-lg',
    secondary: 'bg-gray-100 dark:bg-gray-900 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 focus:ring-gray-500',
    outline: 'border-2 border-[#E3FD72] text-[#E3FD72] hover:bg-[#E3FD72] hover:text-black focus:ring-[#E3FD72]',
    ghost: 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 focus:ring-gray-500',
    dark: 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 focus:ring-gray-900 dark:focus:ring-gray-100'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

// Icon Button Component
export function IconButton({ 
  icon, 
  label,
  variant = 'ghost',
  size = 'md',
  onClick,
  className = '',
  ...props 
}) {
  const baseClasses = 'rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center';
  
  const variants = {
    primary: 'bg-[#E3FD72] text-black hover:bg-[#d5ed62] focus:ring-[#E3FD72]',
    ghost: 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 focus:ring-gray-500'
  };
  
  const sizes = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      aria-label={label}
      {...props}
    >
      {icon}
    </button>
  );
}

// Button Group Component
export function ButtonGroup({ children, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {children}
    </div>
  );
}