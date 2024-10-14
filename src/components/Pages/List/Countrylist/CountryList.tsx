import React, { useReducer } from 'react';
import { Country, countries as initialCountries } from '@/data/Countries';
import { reducer, initialState } from '../Functions/useCountriesReducer';
import { useSortedCountries } from '../Functions/useSortedCountries';
import CountryForm from './CountryForm';
import CountryCard from './CountryCard';
import styles from './List.module.css';

const CountryList: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    countries: initialCountries.map((country) => ({
      ...country,
      isDeleted: false,
    })),
  });

  const sortedCountries = useSortedCountries(state.countries, state.sortByLikes);

  const handleAddCountry = (country: Country) => {
    dispatch({ type: 'ADD_COUNTRY', country });
  };

  const handleLike = (id: number) => {
    dispatch({ type: 'LIKE_COUNTRY', id });
  };

  const handleDeleteCountry = (id: number) => {
    dispatch({ type: 'DELETE_COUNTRY', id });
  };

  const handleRestoreCountry = (id: number) => {
    dispatch({ type: 'RESTORE_COUNTRY', id });
  };

  const toggleSortByLikes = () => {
    dispatch({ type: 'TOGGLE_SORT_BY_LIKES' });
  };

  return (
    <div className={styles.container}>
      <h1>Countries List</h1>

      <CountryForm onAddCountry={handleAddCountry} />

      <button onClick={toggleSortByLikes} className={styles.sortButton}>
        {state.sortByLikes === 'asc' && 'Sort by Likes (Descending)'}
        {state.sortByLikes === 'desc' && 'Clear Sort'}
        {!state.sortByLikes && 'Sort by Likes (Ascending)'}
      </button>

      <div className={styles.countriesGrid}>
        {sortedCountries.map((country) => (
          <CountryCard
            key={country.id}
            country={country}
            onLike={handleLike}
            onDelete={handleDeleteCountry}
            onRestore={handleRestoreCountry}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryList;
