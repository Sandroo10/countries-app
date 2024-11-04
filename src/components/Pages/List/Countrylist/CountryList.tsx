import React, { useReducer, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { reducer, initialState } from "../Functions/useCountriesReducer";
import { useSortedCountries } from "../Functions/useSortedCountries";
import CountryForm from "./CountryForm";
import EditCountryForm from "./EditCountryform";
import { Country } from "@/data/Countries";
import CountryCard from "./CountryCard";
import { translations } from "@/data/translations";
import styles from "./List.module.css";
import axios from "axios";

const CountryList: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const t = translations[lang as keyof typeof translations] || translations.en;

  const [state, dispatch] = useReducer(reducer, initialState);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);

  useEffect(() => {
    axios.get("http://localhost:3000/countries").then((res) => {
      dispatch({ type: "INITIALIZE_COUNTRIES", countries: res.data });
    });
  }, []);

  const sortedCountries = useSortedCountries(state.countries, state.sortByLikes);

  const handleAddCountry = (country: Country) => {
    axios
    .post("http://localhost:3000/countries", country)
    .then((res) => {
      dispatch({ type: "ADD_COUNTRY", country: res.data });
    })
    .catch((error) => {
      console.error("Error adding country:", error.response);
    });
  };

  const handleLike = (id: string) => {
    dispatch({ type: "LIKE_COUNTRY", id });
  };

  const handleDeleteCountry = (id: string) => {
    axios
      .delete(`http://localhost:3000/countries/${id}`)
      .then(() => {
        dispatch({ type: "DELETE_COUNTRY", id });
      })
      .catch((error) => {
        console.error("Error deleting country:", error.response);
      });
  };

  const handleEditCountry = (country: Country) => {
    setEditingCountry(country);
  };

  const handleSaveEdit = (updatedCountry: Country) => {
    axios
      .put(`http://localhost:3000/countries/${updatedCountry.id}`, updatedCountry)
      .then(() => {
        dispatch({ type: "EDIT_COUNTRY", country: updatedCountry });
        setEditingCountry(null);
      })
      .catch((error) => {
        console.error("Error updating country:", error.response);
      });
  };

  const handleCancelEdit = () => {
    setEditingCountry(null);
  };

  const toggleSortByLikes = () => {
    dispatch({ type: "TOGGLE_SORT_BY_LIKES" });
  };

  return (
    <div className={styles.container}>
      <h1>{t.listTitle}</h1>
      <CountryForm onAddCountry={handleAddCountry} />
      {editingCountry && (
        <EditCountryForm
          country={editingCountry}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
      <button onClick={toggleSortByLikes} className={styles.sortButton}>
        {state.sortByLikes === "asc" ? t.countryCards.sortByLikesDesc : t.countryCards.sortByLikesAsc}
      </button>
      <div className={styles.countriesGrid}>
        {sortedCountries.map((country) => (
          <CountryCard
            key={country.id}
            country={country}
            onLike={handleLike}
            onDelete={handleDeleteCountry}
            onEdit={handleEditCountry}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryList;
