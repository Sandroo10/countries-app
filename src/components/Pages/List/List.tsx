import React, { useState } from 'react';
import { countries } from '@/data/Countries';
import styles from './List.module.css';

const List: React.FC = () => {
  const [countryData, setCountryData] = useState(countries);
  const [sortByLikes, setSortByLikes] = useState<'asc' | 'desc' | null>(null);

  const handleLike = (id: number) => {
    const updatedCountries = countryData.map((country) => {
      if (country.id === id) {
        return { ...country, likes: country.likes + 1 };
      }
      return country;
    });
    setCountryData(updatedCountries);
  };

  const toggleSortByLikes = () => {
    if (!sortByLikes) {
      setSortByLikes('asc');
    } else if (sortByLikes === 'asc') {
      setSortByLikes('desc');
    } else {
      setSortByLikes(null);
    }
  };

  let sortedCountries = countryData;
  if (sortByLikes === 'asc') {
    sortedCountries = [...countryData].sort((a, b) => a.likes - b.likes);
  } else if (sortByLikes === 'desc') {
    sortedCountries = [...countryData].sort((a, b) => b.likes - a.likes);
  }

  return (
    <div className={styles.container}>
      <h1>Countries List</h1>
      <button onClick={toggleSortByLikes} className={styles.sortButton}>
        {sortByLikes === 'asc'
          ? 'Sort by Likes (Descending)'
          : sortByLikes === 'desc'
          ? 'Clear Sort'
          : 'Sort by Likes (Ascending)'}
      </button>

      <div className={styles.countriesGrid}>
        {sortedCountries.length > 0 ? (
          sortedCountries.map((country) => (
            <div key={country.id} className={styles.countryCard}>
              <img src={country.image} alt={country.name} className={styles.countryImage} />
              <h2>{country.name}</h2>
              <p>Population: {country.population}</p>
              <p>Capital: {country.capital}</p>
              <button onClick={() => handleLike(country.id)} className={styles.likeButton}>
                Like ({country.likes})
              </button>
            </div>
          ))
        ) : (
          <p>No countries to display.</p>
        )}
      </div>
    </div>
  );
};

export default List;
