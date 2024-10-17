import React, { useState } from 'react';
import { Country } from '@/data/Countries';
import styles from './List.module.css';

type CountryFormProps = {
  onAddCountry: (country: Country) => void;
};

const CountryForm: React.FC<CountryFormProps> = ({ onAddCountry }) => {
  const [newCountry, setNewCountry] = useState({
    name: '',
    population: '',
    capital: '',
    image: '',
  });
  const [errors, setErrors] = useState({ name: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewCountry({
      ...newCountry,
      [name]: value,
    });

    if (name === 'name') {
      if (value.length > 8) {
        setErrors({ ...errors, name: 'Country Name must be 8 characters or less.' });
      } else {
        setErrors({ ...errors, name: '' });
      }
    }
  };

  const handleAddCountry = (e: React.FormEvent) => {
    e.preventDefault();

    if (errors.name) return;

    const newCountryData: Country = {
      id: Date.now(),
      name: newCountry.name,
      population: Number(newCountry.population),
      capital: newCountry.capital,
      likes: 0,
      image: newCountry.image,
      isDeleted: false,
    };

    onAddCountry(newCountryData);

    setNewCountry({ name: '', population: '', capital: '', image: '' });
  };

  return (
    <form onSubmit={handleAddCountry} className={styles.addForm}>
      <div className={styles.formGroup}>
        <label>Country Name (max 8 characters)</label>
        <input
          type="text"
          name="name"
          placeholder="Country Name"
          value={newCountry.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.formGroup}>
        <label>Population</label>
        <input
          type="number"
          name="population"
          placeholder="Population"
          value={newCountry.population}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Capital</label>
        <input
          type="text"
          name="capital"
          placeholder="Capital"
          value={newCountry.capital}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Image URL</label>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newCountry.image}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" disabled={!!errors.name}>
        Add Country
      </button>
    </form>
  );
};

export default CountryForm;
