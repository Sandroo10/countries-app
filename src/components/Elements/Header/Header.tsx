import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1>CoolestSite</h1>
      </div>
      <div className={styles.headerRight}>
        <Link to="/" className={styles.linkButton}>Home</Link>
        <Link to="/list" className={styles.linkButton}>List</Link>
        <Link to="/about" className={styles.linkButton}>About</Link>
        <Link to="/contact" className={styles.linkButton}>Contact Us</Link>
      </div>
    </header>
  );
};

export default Header;
