import React, { useState } from 'react';
import { Country } from '@/data/Countries';
import styles from './List.module.css';

type CountryFormProps = {
  onAddCountry: (country: Country) => void;
};

const CountryForm: React.FC<CountryFormProps> = ({ onAddCountry }) => {
  const [newCountry, setNewCountry] = useState({
    nameGeorgian: '',
    nameEnglish: '',
    capitalGeorgian: '',
    capitalEnglish: '',
    population: '',
    image: '' as string | null, // Image as Base64 or null
  });

  const [errors, setErrors] = useState({ nameGeorgian: '', nameEnglish: '', image: '' });
  const [isImageConverted, setIsImageConverted] = useState(false); // Track conversion

  const georgianRegex = /^[\u10A0-\u10FF]+$/; // Georgian letters only
  const englishRegex = /^[A-Za-z]+$/; // English letters only

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // Allow backspace (empty value) without validation errors
    if (value === '') {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      setNewCountry((prevCountry) => ({
        ...prevCountry,
        [name]: value,
      }));
      return;
    }
  
    // Georgian validation for name and capital
    if (name === 'nameGeorgian' || name === 'capitalGeorgian') {
      if (!georgianRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: 'Invalid Georgian characters',
        }));
        return;
      }
    }
  
    // English validation for name and capital
    if (name === 'nameEnglish' || name === 'capitalEnglish') {
      if (!englishRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: 'Invalid English characters',
        }));
        return;
      }
    }
  
    // If valid, update state and clear errors
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    setNewCountry((prevCountry) => ({
      ...prevCountry,
      [name]: value,
    }));
  };
  

  const convertToBase64 = (selectedFile: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = () => {
      console.log('Base64 conversion successful:', reader.result);
      setNewCountry((prevCountry) => ({
        ...prevCountry,
        image: reader.result as string, // Store as Base64 string
      }));
      setIsImageConverted(true); // Mark as converted
    };

    reader.onerror = () => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: 'Image conversion failed. Please try again.',
      }));
      setIsImageConverted(false); // Ensure the form can't submit
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validExtensions = ['image/jpeg', 'image/png'];
      if (!validExtensions.includes(file.type)) {
        setErrors((prevErrors) => ({ ...prevErrors, image: 'Invalid image type' }));
        return;
      }

      convertToBase64(file); // Convert to Base64
    }
  };

  const handleAddCountry = (e: React.FormEvent) => {
    e.preventDefault();

    if (errors.nameGeorgian || errors.nameEnglish || errors.image || !isImageConverted) {
      console.log('Form submission blocked due to errors or pending image conversion.');
      return; // Prevent submission if errors exist
    }

    const newCountryData: Country = {
      id: Date.now(),
      name: newCountry.nameEnglish, // Use the English name for consistency
      population: Number(newCountry.population),
      capital: newCountry.capitalEnglish, // Use the English capital for consistency
      likes: 0,
      image: newCountry.image as string, // Use Base64 string
      isDeleted: false,
      nameGeorgian: newCountry.nameGeorgian,
      capitalGeorgian: newCountry.capitalGeorgian,
    };

    onAddCountry(newCountryData);
    setNewCountry({ nameGeorgian: '', nameEnglish: '', capitalGeorgian: '', capitalEnglish: '', population: '', image: null });
    setIsImageConverted(false); // Reset for next submission
  };

  return (
    <form onSubmit={handleAddCountry} className={styles.addForm}>
      <div className={styles.formGroup}>
        <label>Country Name (Georgian)</label>
        <input
          type="text"
          name="nameGeorgian"
          placeholder="Enter Georgian name"
          value={newCountry.nameGeorgian}
          onChange={handleInputChange}
        />
        {errors.nameGeorgian && <p className={styles.error}>{errors.nameGeorgian}</p>}
      </div>

      <div className={styles.formGroup}>
        <label>Country Name (English)</label>
        <input
          type="text"
          name="nameEnglish"
          placeholder="Enter English name"
          value={newCountry.nameEnglish}
          onChange={handleInputChange}
        />
        {errors.nameEnglish && <p className={styles.error}>{errors.nameEnglish}</p>}
      </div>

      <div className={styles.formGroup}>
        <label>Capital (Georgian)</label>
        <input
          type="text"
          name="capitalGeorgian"
          placeholder="Enter Georgian capital"
          value={newCountry.capitalGeorgian}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Capital (English)</label>
        <input
          type="text"
          name="capitalEnglish"
          placeholder="Enter English capital"
          value={newCountry.capitalEnglish}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Population</label>
        <input
          type="number"
          name="population"
          placeholder="Enter population"
          value={newCountry.population}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Image (must be .jpg or .png)</label>
        <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
        {errors.image && <p className={styles.error}>{errors.image}</p>}
      </div>

      <button type="submit" disabled={!!errors.nameGeorgian || !!errors.nameEnglish || !!errors.image || !isImageConverted}>
        Add Country
      </button>
    </form>
  );
};

export default CountryForm;
