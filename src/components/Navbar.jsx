import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white px-6 py-4 shadow-md flex items-center border-b">
      <img
        src="/logos/seatsearchpro-logo.png"
        alt="SeatSearchPro Logo"
        className="h-24 w-auto rounded-xl cursor-pointer"
        onClick={() => navigate('/')}
      />
    </nav>
  );
};

export default Navbar;