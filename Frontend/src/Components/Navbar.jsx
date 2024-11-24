import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 fixed w-full flex items-center justify-between z-10">
      <div className="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/40" // Replace with a dynamic URL
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <h1 className="text-xl font-bold text-gray-700">Admin Name</h1>
      </div>
    </header>
  );
};

export default Navbar;
