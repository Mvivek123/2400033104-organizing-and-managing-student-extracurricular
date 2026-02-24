import React from 'react';

export default function Button({ children, onClick, className = '', ...props }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
