import { Country } from "@/data/Countries";

type Action =
  | { type: "INITIALIZE_COUNTRIES"; countries: Country[] }
  | { type: "LIKE_COUNTRY"; id: string }
  | { type: "TOGGLE_SORT_BY_LIKES" }
  | { type: "ADD_COUNTRY"; country: Country }
  | { type: "DELETE_COUNTRY"; id: string }
  | { type: "RESTORE_COUNTRY"; id: string }
  | { type: "EDIT_COUNTRY"; country: Country }
  | { type: "SET_SORT_ORDER"; sortOrder: "likes" | "-likes" | null };
type State = {
  countries: Country[];
  sortByLikes: "likes" | "-likes" | null;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INITIALIZE_COUNTRIES":
      return { ...state, countries: action.countries };
    case "LIKE_COUNTRY":
      return {
        ...state,
        countries: state.countries.map((country) =>
          country.id === action.id
            ? { ...country, likes: country.likes + 1 }
            : country,
        ),
      };
    case "TOGGLE_SORT_BY_LIKES": {
      let newSortByLikes: "likes" | "-likes" | null = state.sortByLikes;
      if (!state.sortByLikes) {
        newSortByLikes = "likes";
      } else if (state.sortByLikes === "likes") {
        newSortByLikes = "-likes";
      } else {
        newSortByLikes = null;
      }
      return { ...state, sortByLikes: newSortByLikes };
    }
    // In useCountriesReducer.ts
    case "SET_SORT_ORDER":
      return {
        ...state,
        sortByLikes: action.sortOrder,
      };

    case "DELETE_COUNTRY": {
      const updatedCountries = state.countries.filter(
        (country) => country.id !== action.id,
      );
      return {
        ...state,
        countries: updatedCountries,
      };
    }
    case "EDIT_COUNTRY":
      return {
        ...state,
        countries: state.countries.map((country) =>
          country.id === action.country.id ? { ...action.country } : country,
        ),
      };
    default:
      return state;
  }
};

export const initialState: State = {
  countries: [],
  sortByLikes: null,
};
