export type Country = {
  nameGeorgian: string;
  capitalGeorgian: string;
  id: string;
  name: string;
  population: number;
  capital: string;
  likes: number;
  image: string;
  isDeleted: boolean;
};

export const countries: Country[] = [
  {
    id: "1",
    name: "Japan",
    image: "../src/assets/japan.jfif",
    population: 126300000,
    capital: "Tokyo",
    likes: 187,
    isDeleted: false,
    nameGeorgian: "",
    capitalGeorgian: "",
  },
  {
    id: "2",
    name: "France",
    image: "../src/assets/france.jfif",
    population: 67390000,
    capital: "Paris",
    likes: 187,
    isDeleted: false,
    nameGeorgian: "",
    capitalGeorgian: "",
  },
  {
    id: "3",
    name: "Brazil",
    image: "../src/assets/brazil.jfif",
    population: 212600000,
    capital: "Brasília",
    likes: 13,
    isDeleted: false,
    nameGeorgian: "",
    capitalGeorgian: "",
  },
];
