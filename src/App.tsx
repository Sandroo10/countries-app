import React from 'react';
import Header from './Header/Header.tsx';
import Hero from './Hero/Hero.tsx';
import CountryCard from './Card/CountryCard/CountryCard.tsx';
import CountryImage from './Card/CountryImage/CountryImage.tsx';
import CountryDetails from './Card/CountryDetails/CountryDetails.tsx';
import { countries } from './Card/data/Countries.ts';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="main-content">
        <Hero />
        <div className="cardContainer">
          {countries.map((country, index) => (
            <CountryCard key={index}>
              <CountryImage image={country.image} name={country.name} />
              <CountryDetails 
                name={country.name} 
                capital={country.capital} 
                population={country.population} 
              />
            </CountryCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
