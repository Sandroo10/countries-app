import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>CoolestSite</h1>
      </div>
      <div className="header-right">
        <button>Home</button>
        <button>Menu</button>
        <button>Contact</button>
      </div>
    </header>
  );
};

export default Header;
