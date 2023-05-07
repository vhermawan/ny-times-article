import React, { FC, useEffect } from 'react';
import Header from './header';
import { InitializeData } from '@/helpers';
import Loading from '../loading';

type LayoutProps = {
  children: React.ReactNode;
  isLoading: boolean;
};

const Layout: FC<LayoutProps> = ({ children, isLoading }) => {
  useEffect(() => {
    InitializeData();
  }, [InitializeData]);

  return (
    <>
      <Header />
      {isLoading ? <Loading isLoading /> : children}
    </>
  );
};

export default Layout;
