import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './About.module.css';
import { translations } from '@/data/translations';

const About: React.FC = () => {
  const { lang } = useParams(); 
  const t = translations[lang as keyof typeof translations] || translations.en; 

  return (
    <section className={styles.aboutSection}>
      <h1 className={styles.aboutTitle}>{t.aboutTitle}</h1>
      <p className={styles.aboutText}>{t.aboutText1}</p>
      <p className={styles.aboutText}>{t.aboutText2}</p>
      <p className={styles.aboutText}>{t.aboutText3}</p>
    </section>
  );
};

export default About;
