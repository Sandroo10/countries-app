import React from 'react';
import Header from '@/components/Elements/Header/Header'; 
import { Outlet } from 'react-router-dom'; 
import Footer from '@/components/Elements/Footer/Footer';

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
