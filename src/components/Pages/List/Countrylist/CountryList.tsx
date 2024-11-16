import React, { useReducer, useState, useRef, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { reducer, initialState } from "../Functions/useCountriesReducer";
import CountryForm from "./CountryForm";
import EditCountryForm from "./EditCountryform";
import { Country } from "@/data/Countries";
import CountryCard from "./CountryCard";
import { translations } from "@/data/translations";
import styles from "./List.module.css";
import { useVirtualizer } from "@tanstack/react-virtual";
import { fetchCountries, addCountry, deleteCountry, updateCountry } from "@/api/countryApi";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const CountryList: React.FC = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { lang } = useParams<{ lang: string }>();
  const t = translations[lang as keyof typeof translations] || translations.en;
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSort = searchParams.get("sort") || null;
  

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    sortByLikes: initialSort as "likes" | "-likes" | null,
  });
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const limit = 10;
  const sortByLikes = state.sortByLikes;
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["countries", state.sortByLikes],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchCountries(state.sortByLikes, pageParam, limit);
      return {
        countries: response.countries,
        nextPage: pageParam + 1,
        totalCount: response.totalCount,
      };
    },
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.totalCount / limit);
      return lastPage.nextPage <= totalPages ? lastPage.nextPage : undefined;
    },
    initialPageParam: 1,
  });
  
  

  useEffect(() => {
    if (data?.pages) {
      const allCountries = data.pages.flatMap((page) => page.countries);
      dispatch({ type: "INITIALIZE_COUNTRIES", countries: allCountries });
    }
  }, [data]);

  const virtualizer = useVirtualizer({
    count: data?.pages.flatMap((page) => page.countries).length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 10,
  });
  useEffect(() => {
    const onScroll = () => {
      if (
        parentRef.current &&
        parentRef.current.scrollHeight - parentRef.current.scrollTop <=
          parentRef.current.clientHeight + 100
      ) {
        if (hasNextPage) {
          fetchNextPage();
        }
      }
    };
  
    const scrollContainer = parentRef.current;
    scrollContainer?.addEventListener("scroll", onScroll);
  
    return () => scrollContainer?.removeEventListener("scroll", onScroll);
  }, [fetchNextPage, hasNextPage]);
  

  useEffect(() => {
    virtualizer.scrollToIndex(0);
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();
  
    if (
      lastItem &&
      lastItem.index >= state.countries.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    sortByLikes, 
    virtualizer, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    state.countries.length, 
  ]);
  

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

  const handleAddCountry = (country: Country) => addCountryMutation.mutate(country);

  const handleLike = (id: string) => dispatch({ type: "LIKE_COUNTRY", id });

  const handleDeleteCountry = (id: string) => deleteCountryMutation.mutate(id);

  const handleEditCountry = (country: Country) => setEditingCountry(country);

  const handleSaveEdit = (updatedCountry: Country) => updateCountryMutation.mutate(updatedCountry);

  const handleCancelEdit = () => setEditingCountry(null);

  const toggleSortByLikes = () => {
    const newSortOrder =
      state.sortByLikes === "likes"
        ? "-likes"
        : state.sortByLikes === "-likes"
        ? null
        : "likes";

    dispatch({ type: "SET_SORT_ORDER", sortOrder: newSortOrder });
    queryClient.invalidateQueries({ queryKey: ["countries"] });
    setSearchParams({ sort: newSortOrder || "" });
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
      <button
        onClick={toggleSortByLikes}
        className={styles.sortButton}
        disabled={isLoading}
      >
        {state.sortByLikes === "likes"
          ? t.countryCards.sortByLikesDesc
          : state.sortByLikes === "-likes"
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
            const country = state.countries[virtualRow.index];
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
                  transform: `translateY(${virtualRow.start}px)`
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
    </div>
  );
};

export default CountryList;
