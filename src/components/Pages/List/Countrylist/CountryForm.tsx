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

  const handleAddCountry = (e: React.FormEvent) => {
    e.preventDefault();
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
      <input
        type="text"
        placeholder="Country Name"
        value={newCountry.name}
        onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Population"
        value={newCountry.population}
        onChange={(e) => setNewCountry({ ...newCountry, population: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Capital"
        value={newCountry.capital}
        onChange={(e) => setNewCountry({ ...newCountry, capital: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={newCountry.image}
        onChange={(e) => setNewCountry({ ...newCountry, image: e.target.value })}
        required
      />
      <button type="submit">Add Country</button>
    </form>
  );
};

export default CountryForm;
