import React from 'react';
import Hero from '#/Hero/Hero'; 
import CountryCard from '#/Card/CountryCard/CountryCard';


const HeroCountry: React.FC = () => {
  return (
    <div className="heroCountryContainer">
      <Hero /> 
      <CountryCard /> 
    </div>
  );
};

export default HeroCountry;
