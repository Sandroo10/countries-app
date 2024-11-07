import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCountryById } from "@/api/countryApi";
import { translations } from "@/data/translations";
import styles from "./CountryPage.module.css";

type Country = {
  id: string;
  images?: string[];
  name: string;
  description?: string;
};

const CountryPage: React.FC = () => {
  const { id = "", lang = "en" } = useParams<{ id: string; lang: string }>();

  const { data: country, isLoading, error } = useQuery<Country | null>({
    queryKey: ["country", id],
    queryFn: () => fetchCountryById(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !country) return <Navigate to="*" />;

  const t = translations[lang as keyof typeof translations] || translations.en;
  const countryTranslations = t.countries[id as keyof typeof t.countries];

  return (
    <div className={styles.countryPage}>
      <div className={styles.imagesContainer}>
        <img
          src={country.images?.[0] || ""}
          alt={`${countryTranslations.name} view 1`}
          className={styles.imageLeft}
        />
        <img
          src={country.images?.[1] || ""}
          alt={`${countryTranslations.name} view 2`}
          className={styles.imageCenter}
        />
        <img
          src={country.images?.[2] || ""}
          alt={`${countryTranslations.name} view 3`}
          className={styles.imageRight}
        />
      </div>
      <p className={styles.description}>{countryTranslations.description}</p>
    </div>
  );
};

export default CountryPage;
