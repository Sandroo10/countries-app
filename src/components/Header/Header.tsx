import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1>CoolestSite</h1>
      </div>
      <div className={styles.headerRight}>
        <button>Home</button>
        <button>Menu</button>
        <button>Contact</button>
      </div>
    </header>
  );
};

export default Header;
