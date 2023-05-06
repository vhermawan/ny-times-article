import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getArticles } from './query';
import Layout from '@/components/layout';
import Card from '@/components/card';
import Container from '@/components/container';
import Title from '@/components/title';
import Loading from '@/components/loading';

const ArticlePage: FC = () => {
  const { data, isFetching } = useQuery(['list-articles'], () => getArticles('emailed', 1));

  return (
    <Layout>
      <Loading isLoading={isFetching} />
      <Container>
        <div className="mt-10">
          <Title title="Article Page" />
        </div>
        <div className="mt-5 flex flex-col md:flex-row bg-red-400 p-4 gap-4">
          <Card />
          <Card />
          <Card />
        </div>
      </Container>
    </Layout>
  );
};

export default ArticlePage;
