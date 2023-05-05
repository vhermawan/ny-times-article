import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getArticles } from './query';
import Layout from '@/components/layout';

const ArticlePage: FC = () => {
  // const { data, isFetching } = useQuery(['list-articles'], () => getArticles('emailed', 1));

  // console.log('data', data);

  return (
    <Layout>
      <h1>Article page</h1>
    </Layout>
  );
};

export default ArticlePage;
