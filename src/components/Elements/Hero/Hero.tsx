import React from "react";
import { useParams } from "react-router-dom";
import styles from "./Hero.module.css";
import { translations } from "@/data/translations";

const Hero: React.FC = () => {
  const { lang } = useParams();
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>{t.heroTitle}</h1>
        <p>{t.heroDescription}</p>
      </div>
    </section>
  );
};

export default Hero;
