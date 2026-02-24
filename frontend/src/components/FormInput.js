import React from 'react';

export default function FormInput({ label, ...props }) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1">{label}</label>}
      <input className="w-full border px-3 py-2 rounded" {...props} />
    </div>
  );
}
