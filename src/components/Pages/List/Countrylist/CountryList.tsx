import React, { useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { reducer, initialState } from "../Functions/useCountriesReducer";
import { useSortedCountries } from "../Functions/useSortedCountries";
import CountryForm from "./CountryForm";
import EditCountryForm from "./EditCountryform";
import { Country } from "@/data/Countries";
import CountryCard from "./CountryCard";
import { translations } from "@/data/translations";
import styles from "./List.module.css";
import { fetchCountries, addCountry, deleteCountry, updateCountry } from "@/api/countryApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const CountryList: React.FC = () => {
  const queryClient = useQueryClient();
  const { lang } = useParams<{ lang: string }>();
  const t = translations[lang as keyof typeof translations] || translations.en;

  const [state, dispatch] = useReducer(reducer, initialState);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);


  const { isLoading, isError } = useQuery<Country[], Error>({
    queryKey: ["countries"],
    queryFn: async () => {
      const fetchedCountries: Country[] = await fetchCountries();
      dispatch({ type: "INITIALIZE_COUNTRIES", countries: fetchedCountries });
      return fetchedCountries;
    }
  });
  

  const addCountryMutation = useMutation({
    mutationFn: addCountry,
    onSuccess: (newCountry) => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      dispatch({ type: "ADD_COUNTRY", country: newCountry });
    },
  });

  const deleteCountryMutation = useMutation({
    mutationFn: deleteCountry,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      dispatch({ type: "DELETE_COUNTRY", id });
    },
  });

  const updateCountryMutation = useMutation({
    mutationFn: updateCountry,
    onSuccess: (updatedCountry) => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      dispatch({ type: "EDIT_COUNTRY", country: updatedCountry });
      setEditingCountry(null);
    },
  });

  const sortedCountries = useSortedCountries(state.countries, state.sortByLikes);

  const handleAddCountry = (country: Country) => {
    addCountryMutation.mutate(country);
  };

  const handleLike = (id: string) => {
    dispatch({ type: "LIKE_COUNTRY", id });
  };

  const handleDeleteCountry = (id: string) => {
    deleteCountryMutation.mutate(id);
  };

  const handleEditCountry = (country: Country) => {
    setEditingCountry(country);
  };

  const handleSaveEdit = (updatedCountry: Country) => {
    updateCountryMutation.mutate(updatedCountry);
  };

  const handleCancelEdit = () => {
    setEditingCountry(null);
  };

  const toggleSortByLikes = () => {
    dispatch({ type: "TOGGLE_SORT_BY_LIKES" });
  };

  if (isLoading) return <p>Loading countries...</p>;
  if (isError) return <p>Error fetching countries.</p>;

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
      <button onClick={toggleSortByLikes} className={styles.sortButton} disabled={isLoading}>
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
