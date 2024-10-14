import React from 'react';
import { Country } from '@/data/Countries';
import styles from './List.module.css';

type CountryCardProps = {
  country: Country;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
  onRestore: (id: number) => void;
};

const CountryCard: React.FC<CountryCardProps> = ({ country, onLike, onDelete, onRestore }) => {
  return (
    <div
      className={styles.countryCard}
      style={{
        opacity: country.isDeleted ? 0.5 : 1,
        order: country.isDeleted ? 1 : 0,
      }}
    >
      <img src={country.image} alt={country.name} className={styles.countryImage} />
      <h2>{country.name}</h2>
      <p>Population: {country.population}</p>
      <p>Capital: {country.capital}</p>
      <button onClick={() => onLike(country.id)} className={styles.likeButton}>
        Like ({country.likes})
      </button>
      {!country.isDeleted ? (
        <button onClick={() => onDelete(country.id)} className={styles.deleteButton}>
          Delete
        </button>
      ) : (
        <button onClick={() => onRestore(country.id)} className={styles.restoreButton}>
          Restore
        </button>
      )}
    </div>
  );
};

export default CountryCard;
