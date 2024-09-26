import React, { PropsWithChildren } from 'react';
import styles from './CountryCard.module.css';



const CountryCard: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.countryCard}>
      {children}
    </div>
  );
};

export default CountryCard;
