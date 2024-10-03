import React, { Suspense, lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from '#/Layout/Layout';
import NotFound from './components/NotFound/NotFound';
const HeroCountry = lazy(() => import('./components/HeroCountry/HeroCountry'));
const About = lazy(() => import('./components/About/About'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1 style={{display: 'flex' , justifyContent: 'center', alignItems: 'center'}}>Loading...</h1>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HeroCountry />} />
            <Route path="about" element={<About />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
