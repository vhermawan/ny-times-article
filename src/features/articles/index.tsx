import { useQuery } from '@tanstack/react-query';
import { FC, Fragment, useCallback, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { getArticles, searchArticles } from './query';
import Layout from '@/components/layout';
import Container from '@/components/container';
import Title from '@/components/title';
import Loading from '@/components/loading';
import Select from '@/components/select';
import { mappingData } from './helpers';
import Card from '@/components/card';
import { storage } from '@/common/lib/storage';
import { Encryption, Slugify } from '@/helpers';
import router from 'next/router';
import { LIST_PERIOD_ARTICLES, LIST_TYPE_ARTICLES } from './constant';

const ArticlePage: FC = () => {
  const [type, setType] = useState('all');
  const [period, setPeriod] = useState('1');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [dataArticle, setDataArticle] = useState<Articles[]>([]);
  const [dataSearchArticle, setDataSearchArticle] = useState<Articles[]>([]);

  const observer = useRef<IntersectionObserver | undefined>();

  const { isFetching } = useQuery(
    ['list-articles', type, search, period],
    () => getArticles(type, period),
    {
      enabled: type !== 'all' && search === '',
      onSuccess: data => {
        const dataMapping = mappingData(data, false);
        setDataArticle(dataMapping);
        setDataSearchArticle([]);
      },
    },
  );

  const { isFetching: isFecthingSearch } = useQuery(
    ['list-search-articles', page, type, search],
    () => searchArticles(page),
    {
      enabled: type === 'all' && search === '',
      onSuccess: data => {
        setHasMore(data?.response.docs.length > 0);
        const dataMapping = mappingData(data, true);
        setDataSearchArticle(dataMapping);

        const allData = dataSearchArticle.concat(dataMapping);
        setDataArticle(allData);
      },
    },
  );

  const onHandleLastDataElement = useCallback(
    (node: HTMLElement | null) => {
      if (isFecthingSearch) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFecthingSearch],
  );

  const isLoading = (isFecthingSearch && page === 0) || isFetching;

  const handleChange = debounce((e): void => {
    const dataText = e.target.value;
    setSearch(dataText);
    searchArticlesByTitle(dataText);
  }, 500);

  const searchArticlesByTitle = (searchTerm: string): void => {
    if (searchTerm === '') setDataSearchArticle([]);
    setDataArticle(
      dataArticle.filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  };

  const onRouteReadMore = (data: Articles): void => {
    storage.set('DETAIL', Encryption(data));
    router.push(`/articles/${Slugify(data.title)}`);
  };

  return (
    <Layout isLoading={isLoading}>
      <Container>
        <div className="flex justify-between align-middle mt-10">
          <div className=" w-fit px-6 dark:px-0 mb-4 mt-10">
            <div className="flex items-center border-b border-teal-500 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Search Article"
                aria-label="Title"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <section className="bg-white dark:bg-gray-900">
          <div className="container px-6 py-10 mx-auto">
            <div className="flex justify-between align-middle">
              <Title title="Article Page" />
              <div className="flex gap-4">
                {type !== 'all' && (
                  <Select
                    listOption={LIST_PERIOD_ARTICLES}
                    value={type}
                    onSelect={data => setPeriod(data)}
                  />
                )}
                <Select
                  listOption={LIST_TYPE_ARTICLES}
                  value={type}
                  onSelect={data => setType(data)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
              {dataArticle?.map((data, index) => {
                if (dataArticle.length === index + 1) {
                  return (
                    <Fragment key={data.id}>
                      <div ref={onHandleLastDataElement}>
                        <Card data={data} onReadMore={data => onRouteReadMore(data)} />
                      </div>
                    </Fragment>
                  );
                } else {
                  return (
                    <Fragment key={data.title}>
                      <Card data={data} onReadMore={data => onRouteReadMore(data)} />
                    </Fragment>
                  );
                }
              })}
            </div>
            <div className="flex mt-10">
              <Loading
                isLoading={isFecthingSearch && page > 0}
                className="h-10 w-full"
                classNameText="text-white"
              />
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
};

export default ArticlePage;
