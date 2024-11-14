import React, { useReducer, useState, useRef, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { reducer, initialState } from "../Functions/useCountriesReducer";
import { useSortedCountries } from "../Functions/useSortedCountries";
import CountryForm from "./CountryForm";
import EditCountryForm from "./EditCountryform";
import { Country } from "@/data/Countries";
import CountryCard from "./CountryCard";
import { translations } from "@/data/translations";
import styles from "./List.module.css";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  fetchCountries,
  addCountry,
  deleteCountry,
  updateCountry,
} from "@/api/countryApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Pagination from "./Pagination";

const CountryList: React.FC = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { lang } = useParams<{ lang: string }>();
  const t = translations[lang as keyof typeof translations] || translations.en;
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSort = searchParams.get("sort") || null;
  const initialPage = Number(searchParams.get("page")) || 1;

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    sortByLikes: initialSort as "asc" | "desc" | null,
  });
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [page, setPage] = useState(initialPage);
  const limit = 10;

  const sortedCountries = useSortedCountries(
    state.countries,
    state.sortByLikes,
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["countries", state.sortByLikes, page],
    queryFn: async () => {
      const response = await fetchCountries(state.sortByLikes, page, limit);
      return response;
    },
  });

  useEffect(() => {
    if (data?.countries) {
      setTimeout(() => {
        dispatch({ type: "INITIALIZE_COUNTRIES", countries: data.countries });
      }, 0);
    }
  }, [data, dispatch]);

  const virtualizer = useVirtualizer({
    count: data?.countries.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 10,
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

  useEffect(() => {
    setSearchParams({
      sort: state.sortByLikes || "",
      page: String(page),
    });
  }, [state.sortByLikes, page, setSearchParams]);

  const toggleSortByLikes = () => {
    const newSortOrder =
      state.sortByLikes === "asc"
        ? "desc"
        : state.sortByLikes === "desc"
          ? null
          : "asc";

    dispatch({ type: "SET_SORT_ORDER", sortOrder: newSortOrder });

    // Invalidate query to refetch with new sort order
    queryClient.invalidateQueries({
      queryKey: ["countries", newSortOrder, page],
    });

    // Update search params
    setSearchParams({ sort: newSortOrder || "", page: String(page) });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <p>Loading countries...</p>;
  if (isError) return <p>Error fetching countries.</p>;
  const totalPages = Math.ceil((data?.totalCount || 0) / limit);

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
      <button
        onClick={toggleSortByLikes}
        className={styles.sortButton}
        disabled={isLoading}
      >
        {state.sortByLikes === "asc"
          ? t.countryCards.sortByLikesDesc
          : state.sortByLikes === "desc"
            ? t.countryCards.clearSort
            : t.countryCards.sortByLikesAsc}
      </button>
      <div
        ref={parentRef}
        className={styles.countriesGrid}
        style={{
          height: "500px",
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const country = sortedCountries[virtualRow.index];
            if (!country) return null;
            const gap = 10;
            return (
              <div
                key={country.id}
                style={{
                  position: "absolute",
                  top: virtualRow.start + virtualRow.index * gap,
                  left: 0,
                  width: "90%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className={styles.countryItem}
              >
                <CountryCard
                  country={country}
                  onLike={handleLike}
                  onDelete={handleDeleteCountry}
                  onEdit={handleEditCountry}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Pagination
        currentPage={page}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default CountryList;
