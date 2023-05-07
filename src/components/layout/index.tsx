import React, { FC, useEffect } from 'react';
import Header from './header';
import { GetDataUser, InitializeData } from '@/helpers';
import Loading from '../loading';
import { useGlobalContext } from '@/context';

type LayoutProps = {
  children: React.ReactNode;
  isLoading: boolean;
};

const Layout: FC<LayoutProps> = ({ children, isLoading }) => {
  const { setDataUser } = useGlobalContext();

  useEffect(() => {
    InitializeData();
  }, [InitializeData]);

  useEffect(() => {
    const dataUser = GetDataUser();
    if (dataUser) setDataUser(dataUser);
  }, []);

  return (
    <>
      <Header />
      {isLoading ? <Loading isLoading /> : children}
    </>
  );
};

export default Layout;
