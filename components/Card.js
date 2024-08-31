// components/Card.js
import React from 'react';

export function Card({ children }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {children}
    </div>
  );
}