import { Country } from "@/data/Countries";

type Action =
  | { type: "LIKE_COUNTRY"; id: number }
  | { type: "TOGGLE_SORT_BY_LIKES" }
  | { type: "ADD_COUNTRY"; country: Country }
  | { type: "DELETE_COUNTRY"; id: number }
  | { type: "RESTORE_COUNTRY"; id: number };

type State = {
  countries: Country[];
  sortByLikes: "asc" | "desc" | null;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
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
      let newSortByLikes: "asc" | "desc" | null = state.sortByLikes;
      if (!state.sortByLikes) {
        newSortByLikes = "asc";
      } else if (state.sortByLikes === "asc") {
        newSortByLikes = "desc";
      } else {
        newSortByLikes = null;
      }
      return { ...state, sortByLikes: newSortByLikes };
    }
    case "ADD_COUNTRY":
      return {
        ...state,
        countries: [...state.countries, action.country],
      };
    case "DELETE_COUNTRY":
      return {
        ...state,
        countries: state.countries.map((country) =>
          country.id === action.id ? { ...country, isDeleted: true } : country,
        ),
      };
    case "RESTORE_COUNTRY":
      return {
        ...state,
        countries: state.countries.map((country) =>
          country.id === action.id ? { ...country, isDeleted: false } : country,
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
