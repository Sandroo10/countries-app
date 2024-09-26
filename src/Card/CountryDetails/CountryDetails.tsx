import React from 'react';
import styles from './CountryDetails.module.css';

interface CountryDetailsProps {
  name: string;
  capital: string;
  population: number;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ name, capital, population }) => (
  <div className={styles.countryDetails}>
    <h3>{name}</h3>
    <p><strong>Capital:</strong> {capital}</p>
    <p><strong>Population:</strong> {population.toLocaleString()}</p> 
  </div>
);

export default CountryDetails;
