import React from 'react';
import Layout from '#/Layout/Layout';
import CountryCard from '#/Card/CountryCard/CountryCard';
import CountryImage from '#/Card/CountryImage/CountryImage';
import CountryDetails from '#/Card/CountryDetails/CountryDetails';
import { countries } from '@/data/Countries';
import './App.css';

const App: React.FC = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default App;
