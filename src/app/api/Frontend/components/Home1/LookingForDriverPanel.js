"use client";

import React from "react";

const LookingForDriverPanel = ({ ride, onClose }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Looking for a Driver</h2>
      <p>We are finding a driver for your {ride?.name} ride.</p>
      <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 mt-4 rounded">Cancel</button>
    </div>
  );
};

export default LookingForDriverPanel;