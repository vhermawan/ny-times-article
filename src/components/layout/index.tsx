import React, { FC, useEffect } from 'react';
import Header from './header';
import { GetDataUser, InitializeData } from '@/helpers';
import Loading from '../loading';
import Head from 'next/head';
import { useGlobalContext } from '@/context';

type LayoutProps = {
  children: React.ReactNode;
  isLoading: boolean;
};

const Layout: FC<LayoutProps> = ({ children, isLoading }) => {
  const { setDataUser } = useGlobalContext();

  useEffect(() => {
    InitializeData();
  }, []);

  useEffect(() => {
    const dataUser = GetDataUser();
    if (dataUser) setDataUser(dataUser);
  }, [GetDataUser, setDataUser]);

  return (
    <>
      <Head>
        <title>Delos | Book</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {isLoading ? <Loading isLoading /> : children}
    </>
  );
};

export default Layout;
