import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { translations } from "@/data/translations";
import styles from "./CountryPage.module.css";

type Country = {
  id: string;
  images: string[];
  name: string;
  description: string;
};

const CountryPage: React.FC = () => {
  const { id, lang } = useParams<{ id: string; lang: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/countries");
        const countryData = response.data.find((c: Country) => c.id === id);
        setCountry(countryData || null);
      } catch (error) {
        console.error("Error fetching country data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!country) {
    return <Navigate to="*" />;
  }

  const t = translations[lang as keyof typeof translations] || translations.en;
  const countryTranslations = t.countries[id as keyof typeof t.countries];

  return (
    <div className={styles.countryPage}>
      <div className={styles.imagesContainer}>
        <img
          src={country.images[0]}
          alt={`${countryTranslations.name} view 1`}
          className={styles.imageLeft}
        />
        <img
          src={country.images[1]}
          alt={`${countryTranslations.name} view 2`}
          className={styles.imageCenter}
        />
        <img
          src={country.images[2]}
          alt={`${countryTranslations.name} view 3`}
          className={styles.imageRight}
        />
      </div>
      <p className={styles.description}>{countryTranslations.description}</p>
    </div>
  );
};

export default CountryPage;
