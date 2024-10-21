import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Country } from '@/data/Countries';
import { translations } from '@/data/translations';
import styles from './List.module.css';

type CountryFormProps = {
  onAddCountry: (country: Country) => void;
};

const CountryForm: React.FC<CountryFormProps> = ({ onAddCountry }) => {
  const { lang } = useParams<{ lang: string }>();
  const t = translations[lang as keyof typeof translations] || translations.en;

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
        setErrors({ ...errors, name: t.errors.countryNameLength });
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
        <label>{t.labels.countryName} (max 8 characters)</label>
        <input
          type="text"
          name="name"
          placeholder={t.labels.countryNamePlaceholder}
          value={newCountry.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.formGroup}>
        <label>{t.labels.population}</label>
        <input
          type="number"
          name="population"
          placeholder={t.labels.populationPlaceholder}
          value={newCountry.population}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>{t.labels.capital}</label>
        <input
          type="text"
          name="capital"
          placeholder={t.labels.capitalPlaceholder}
          value={newCountry.capital}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>{t.labels.image}</label>
        <input
          type="text"
          name="image"
          placeholder={t.labels.imagePlaceholder}
          value={newCountry.image}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" disabled={!!errors.name}>
        {t.labels.addCountry}
      </button>
    </form>
  );
};

export default CountryForm;
