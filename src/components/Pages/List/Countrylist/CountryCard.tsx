import React from "react";
import { useParams } from "react-router-dom";
import { translations } from "@/data/translations";
import { Country } from "@/data/Countries";
import styles from "./List.module.css";

type Language = "en" | "ka";

type CountryCardProps = {
  country: Country;
  onLike: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (country: Country) => void;
};

const CountryCard: React.FC<CountryCardProps> = ({
  country,
  onLike,
  onDelete,
  onEdit,
}) => {
  const { lang } = useParams<{ lang: Language }>();
  const language: Language = lang === "ka" || lang === "en" ? lang : "en";
  const t = translations[language];

  const displayName = language === "ka" ? country.nameGeorgian : country.name;
  const displayCapital =
    language === "ka" ? country.capitalGeorgian : country.capital;

  const countryTranslation =
    t.countries[country.id as keyof typeof t.countries];
  const countryName = country.name || countryTranslation?.name || displayName;
  const capital =
    country.capital || countryTranslation?.capital || displayCapital;

  return (
    <div
      className={styles.countryCard}
      style={{
        opacity: country.isDeleted ? 0.5 : 1,
        order: country.isDeleted ? 1 : 0,
      }}
    >
      <img
        src={country.image}
        alt={displayName}
        className={styles.countryImage}
      />
      <h2>{countryName}</h2>
      <p>
        {t.countryCards.population}: {country.population}
      </p>
      <p>
        {t.countryCards.capital}: {capital}
      </p>
      <button onClick={() => onLike(country.id)} className={styles.likeButton}>
        {t.countryCards.like} ({country.likes})
      </button>
      {!country.isDeleted ? (
        <>
          <button
            onClick={() => onDelete(country.id)}
            className={styles.deleteButton}
          >
            {t.countryCards.delete}
          </button>
          <button onClick={() => onEdit(country)} className={styles.editButton}>
            {t.countryCards.edit}
          </button>
        </>
      ) : (
        <button className={styles.restoreButton}>
          {t.countryCards.restore}
        </button>
      )}
    </div>
  );
};

export default CountryCard;
