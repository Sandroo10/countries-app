import React from 'react';
import styles from './CountryCard.module.css';
import CountryImage from '#/Card/CountryImage/CountryImage';
import CountryDetails from '#/Card/CountryDetails/CountryDetails';
import { countries } from '@/data/Countries';

const CountryCard: React.FC = () => {
  return (
    <div className={styles.cardContainer}>
      {countries.map((country, index) => (
        <div key={index} className={styles.countryCard}>
          <CountryImage image={country.image} name={country.name} />
          <CountryDetails
            name={country.name}
            capital={country.capital}
            population={country.population}
          />
        </div>
      ))}
    </div>
  );
};

export default CountryCard;
