import React from 'react';

export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`w-full border rounded p-2 resize-none ${className}`}
      {...props}
    />
  );
}
