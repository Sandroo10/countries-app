export interface Country {
    id: number;
    name: string;
    image: string;
    population: number;
    capital: string;
  }
  
  export const countries: Country[] = [
    {
      id: 1,
      name: 'Japan',
      image: '../src/assets/japan.jfif',
      population: 126300000,
      capital: 'Tokyo',
    },
    {
      id: 2,
      name: 'France',
      image: '../src/assets/france.jfif', 
      population: 67390000,
      capital: 'Paris',
    },
    {
      id:3,
      name: 'Brazil',
      image: '../src/assets/brazil.jfif', 
      population: 212600000,
      capital: 'Brasília',
    }
  ];