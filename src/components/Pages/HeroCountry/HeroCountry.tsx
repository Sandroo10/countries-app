import { lazy } from "react";
import React from "react";
const Hero = lazy(() => import("@/components/Elements/Hero/Hero"));
const CountryCard = lazy(
  () => import("@/components/Elements/Card/CountryCard/CountryCard"),
);

const HeroCountry: React.FC = () => {
  return (
    <div className="heroCountryContainer">
      <Hero />
      <CountryCard />
    </div>
  );
};

export default HeroCountry;
