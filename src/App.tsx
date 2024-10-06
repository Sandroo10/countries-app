import React, { Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from '#/Layout/Layout';  
import NotFound from '#/NotFound/NotFound';  
import About from '#/About/About';  
import HeroCountry from '#/HeroCountry/HeroCountry';
import CountryPage from '#/CountryPage/CountryPage';
import Contact from '#/Contact/Contact';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
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
          <Route path=":id" element={<CountryPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
