import React from 'react';
import Header from 'components/Header/Header'; 
import Hero from 'components/Hero/Hero';
import './Layout.css'; 

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <Hero />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
