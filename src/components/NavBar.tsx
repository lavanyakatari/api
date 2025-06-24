import React from "react";


const NavBar = () => {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="text-xl font-bold">MyWebsite</div>

      <div className="hidden md:flex space-x-4">
        <a href="/Home" className="hover:text-gray-300">Home</a>
        <a href="/About" className="hover:text-gray-300">About</a>
        <a href="/Service" className="hover:text-gray-300">Services</a>
        <a href="/Contact" className="hover:text-gray-300">Contact</a>
      </div>
    </nav>
  );
};

export default NavBar;
