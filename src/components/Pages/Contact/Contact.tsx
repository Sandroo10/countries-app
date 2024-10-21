import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { translations } from '@/data/translations'; 
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const t = translations[lang as keyof typeof translations] || translations.en;

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    surname: '',
    email: '',
    message: '',
  });

  const validateField = (name: keyof typeof formData, value: string) => {
    let error = '';
    const fieldName = t.labels[name];

    if (value.length === 0) {
      error = t.errors.required(fieldName);
    } else if (value.length < 4) {
      error = t.errors.minLength(fieldName);
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    const error = validateField(name as keyof typeof formData, value);

    setErrors({
      ...errors,
      [name]: error,
    });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name: validateField('name', formData.name),
      surname: validateField('surname', formData.surname),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== '')) {
      return;
    }
    console.log(formData);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.contactContainer}>
      <h1>{t.contact}</h1>
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className={styles.contactForm} noValidate>
        <div>
          <label htmlFor="name">{t.labels.name}:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={t.labels.name}
            required
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="surname">{t.labels.surname}:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            placeholder={t.labels.surname}
            required
          />
          {errors.surname && <p className={styles.error}>{errors.surname}</p>}
        </div>

        <div>
          <label htmlFor="email">{t.labels.email}:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t.labels.email}
            required
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message">{t.labels.message}:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder={t.labels.message}
            required
          />
          {errors.message && <p className={styles.error}>{errors.message}</p>}
        </div>

        <button type="submit" disabled={Object.values(errors).some((error) => error !== '')}>
          {t.labels.submit}
        </button>
      </form>
    </div>
  );
};

export default Contact;
