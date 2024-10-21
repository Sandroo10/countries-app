import React from 'react';
import { useParams } from 'react-router-dom'; 
import { translations } from '@/data/translations'; 
import { Country } from '@/data/Countries';
import styles from './List.module.css';

type CountryCardProps = {
  country: Country;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
  onRestore: (id: number) => void;
};

const CountryCard: React.FC<CountryCardProps> = ({ country, onLike, onDelete, onRestore }) => {
  const { lang } = useParams<{ lang: string }>(); 
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div
      className={styles.countryCard}
      style={{
        opacity: country.isDeleted ? 0.5 : 1,
        order: country.isDeleted ? 1 : 0,
      }}
    >
      <img src={country.image} alt={country.name} className={styles.countryImage} />
      <h2>{t.countries[String(country.id) as keyof typeof t.countries]?.name || country.name}</h2>
      <p>{t.countryCards.population}: {country.population}</p>
      <p>{t.countryCards.capital}: {country.capital}</p>
      <button onClick={() => onLike(country.id)} className={styles.likeButton}>
        {t.countryCards.like} ({country.likes})
      </button>
      {!country.isDeleted ? (
        <button onClick={() => onDelete(country.id)} className={styles.deleteButton}>
          {t.countryCards.delete}
        </button>
      ) : (
        <button onClick={() => onRestore(country.id)} className={styles.restoreButton}>
          {t.countryCards.restore}
        </button>
      )}
    </div>
  );
};

export default CountryCard;
