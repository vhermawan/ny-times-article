import { formatDate } from '@/common/lib/format';
import Container from '@/components/container';
import Layout from '@/components/layout';
import Title from '@/components/title';
import { useGlobalContext } from '@/context';
import { FC, Fragment } from 'react';

const HistoryPage: FC = () => {
  const { user } = useGlobalContext();

  return (
    <Layout isLoading={user ? false : true}>
      <Container>
        <section className="bg-white mt-[100px]">
          <div className="container px-6 py-10 mx-auto dark:bg-gray-900">
            <div className="flex lg:w-4/5 mx-auto">
              <Title title="Article Buyed" />
            </div>

            {user.books.list.map(data => (
              <Fragment key={data.title}>
                <div className="lg:w-4/5 mx-auto flex flex-wrap my-5 border p-6 rounded-lg dark:text-white">
                  <img
                    alt="image-history"
                    className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                    src={data?.imageUrl}
                  />
                  <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <a
                      href={data?.articleUrl}
                      target="_blank"
                      className="text-gray-900 text-xl title-font font-bold mb-1 lg:text-3xl dark:text-white hover:underline"
                    >
                      {data?.title}
                    </a>
                    <p className="leading-relaxed mt-4 font-light text-justify">{data?.abstract}</p>
                    <div className="flex mt-6">
                      <span className="title-font font-medium text-xl lg:text-2xl text-gray-900 dark:text-white">
                        {formatDate(data?.publishDate || '')}
                      </span>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </section>
      </Container>
    </Layout>
  );
};

export default HistoryPage;
