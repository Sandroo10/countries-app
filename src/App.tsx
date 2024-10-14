import React, { Suspense } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@/components/Elements/Layout/Layout';  
import NotFound from '@/components/Pages/NotFound/NotFound';  
import About from '@/components/Pages/About/About';  
import HeroCountry from '@/components/Pages/HeroCountry/HeroCountry';
import CountryPage from '@/components/Pages/CountryPage/CountryPage';
import Contact from '@/components/Pages/Contact/Contact';
import List from './components/Pages/List/Countrylist/CountryList';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>S
          <Route 
            path="/" 
            element={
              <Suspense fallback={<h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>Loading...</h1>}>
                <HeroCountry />
              </Suspense>
            } 
          />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="list" element={<List />} />
          <Route path=":id" element={<CountryPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
