import React from 'react';
import './CountryCard.css';

interface CountryCardProps {
    country: {
      name: string;
      image: string;
      population: number;
      capital: string;
    };
  }
  
  const CountryCard: React.FC<CountryCardProps> = ({ country }) => (
    <div className="country-card">
      <img src={country.image} alt={country.name} />
      <h3>{country.name}</h3>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p> 
    </div>
  );
  
  export default CountryCard;