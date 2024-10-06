import { lazy } from "react";
import React from 'react';
const Hero = lazy(() => import('@/components/Hero/Hero'));
const CountryCard = lazy(() => import('@/components/Card/CountryCard/CountryCard'));



const HeroCountry: React.FC = () => {
  return (
    <div className="heroCountryContainer">
      <Hero /> 
      <CountryCard /> 
    </div>
  );
};

export default HeroCountry;
