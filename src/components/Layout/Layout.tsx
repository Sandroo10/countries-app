import React from 'react';
import Header from '#/Header/Header'; 
import { Outlet } from 'react-router-dom'; 
import Footer from '#/Footer/Footer';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet /> 
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
