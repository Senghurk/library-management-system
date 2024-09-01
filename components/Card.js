// components/Card.js
import React from 'react';

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white shadow-soft rounded-lg p-6 transition-all hover-scale ${className}`}>
      {children}
    </div>
  );
}