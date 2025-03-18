import React from 'react';

interface CustomButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ active, onClick, children }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg transition ${
        active ? "bg-blue-600 text-white" : "bg-gray-300 text-black hover:bg-gray-400"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;