import React from 'react';
import Header from './Header';
import Hero from './Hero';
import CountryCard from './CountryCard';
import './App.css';

const countries = [
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

const App = () => {
  return (
    <div>
      <Header />
      <div className="main-content">
        <Hero />
        <div className="card-container">
          {countries.map((country, index) => (
            <CountryCard key={index} country={country} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
