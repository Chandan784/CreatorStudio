"use client";

import { useState } from "react";

export const Dialog = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children }) => {
  return <div className="mt-4">{children}</div>;
};

export const DialogHeader = ({ children }) => {
  return (
    <div className="border-b pb-2 mb-4 text-xl font-semibold">{children}</div>
  );
};

export const DialogTitle = ({ children }) => {
  return <h2 className="text-lg font-bold">{children}</h2>;
};
