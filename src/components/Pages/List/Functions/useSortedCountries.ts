import { Country } from "@/data/Countries";

export const useSortedCountries = (
  countries: Country[],
  sortByLikes: "asc" | "desc" | null,
): Country[] => {
  let sortedCountries = countries;

  if (sortByLikes === "asc") {
    sortedCountries = [...countries].sort((a, b) => a.likes - b.likes);
  } else if (sortByLikes === "desc") {
    sortedCountries = [...countries].sort((a, b) => b.likes - a.likes);
  }

  return sortedCountries.sort((a, b) =>
    a.isDeleted === b.isDeleted ? 0 : a.isDeleted ? 1 : -1,
  );
};
