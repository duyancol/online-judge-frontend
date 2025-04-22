import React from 'react';

export function Text({ children, className = '' }) {
  return <p className={`text-base text-gray-700 ${className}`}>{children}</p>;
}
