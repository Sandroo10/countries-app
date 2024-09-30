import React from 'react';
import Header from '#/Header/Header'; 
import Hero from '#/Hero/Hero';
import { PropsWithChildren } from 'react';

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
