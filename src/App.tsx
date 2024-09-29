import React from 'react';
import Layout from 'src/components/Layout/Layout';
import CountryCard from 'src/components/Card/CountryCard/CountryCard';
import CountryImage from 'src/components/Card/CountryImage/CountryImage';
import CountryDetails from 'src/components/Card/CountryDetails/CountryDetails';
import { countries } from 'src/data/Countries';
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
