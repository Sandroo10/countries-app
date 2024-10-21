import React from 'react';
import { useParams } from 'react-router-dom'; 
import { translations } from '@/data/translations'; 
import styles from './CountryDetails.module.css';

interface CountryDetailsProps {
  id: string; // Add ID prop to fetch the correct country
  capital: string;
  population: number;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ id, capital, population }) => {
  const { lang } = useParams<{ lang: string }>();
  const t = translations[lang as keyof typeof translations] || translations.en;
  const countryData = t.countries[id as keyof typeof t.countries]; // Replace countryId with your actual country ID
  const countryName = countryData?.name || countryData?.name;

  return (
    <div className={styles.countryDetails}>
      <h3>{countryName}</h3>
      <p><strong>{t.countryCards.capital}</strong> {capital}</p>
      <p><strong>{t.countryCards.population}</strong> {population.toLocaleString()}</p> 
    </div>
  );
};

export default CountryDetails;
