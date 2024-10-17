import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
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

  const validateField = (name: string, value: string) => {
    let error = '';
    if (value.length === 0) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    } else if (value.length < 4) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least 4 characters.`;
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    const error = validateField(name, value);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className={styles.contactContainer}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            required
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            required
          />
          {errors.surname && <p className={styles.error}>{errors.surname}</p>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            required
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            required
          />
          {errors.message && <p className={styles.error}>{errors.message}</p>}
        </div>

        <button type="submit" disabled={Object.values(errors).some((error) => error !== '')}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
