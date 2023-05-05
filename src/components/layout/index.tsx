import React, { FC, useEffect } from 'react';
import Header from './header';
import { InitializeData } from '@/helpers';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    InitializeData();
  }, [InitializeData]);

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
