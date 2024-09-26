export interface Country {
    name: string;
    image: string;
    population: number;
    capital: string;
  }
  
  export const countries: Country[] = [
    {
      name: 'Japan',
      image: '../src/assets/japan.jfif',
      population: 126300000,
      capital: 'Tokyo',
    },
    {
      name: 'France',
      image: '../src/assets/france.jfif', 
      population: 67390000,
      capital: 'Paris',
    },
    {
      name: 'Brazil',
      image: '../src/assets/brazil.jfif', 
      population: 212600000,
      capital: 'Brasília',
    }
  ];