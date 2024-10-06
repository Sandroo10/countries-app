import React from 'react';
import { useParams } from 'react-router-dom'; 
import { countryPageData } from '@/data/CountryPageData';
import styles from './CountryPage.module.css';

const CountryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const country = countryPageData.find((c) => c.id === Number(id)); 

  if (!country) {
    return <div>Country not found</div>;
  }

  return (
    <div className={styles.countryPage}>
      <div className={styles.imagesContainer}>
        <img src={country.images[0]} alt={`${country.name} view 1`} className={styles.imageLeft} />
        <img src={country.images[1]} alt={`${country.name} view 2`} className={styles.imageCenter} />
        <img src={country.images[2]} alt={`${country.name} view 3`} className={styles.imageRight} />
      </div>
      <p className={styles.description}>{country.description}</p>
    </div>
  );
};

export default CountryPage;
