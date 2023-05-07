import { formatDate } from '@/common/lib/format';
import { storage } from '@/common/lib/storage';
import BreadCrumbs from '@/components/breadcumbs';
import Button from '@/components/button';
import Container from '@/components/container';
import Layout from '@/components/layout';
import { Articles } from '@/features/articles/types';
import { Decryption } from '@/helpers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DetailArticle() {
  const [dataDetail, setDataDetail] = useState<Articles | null>(null);

  useEffect(() => {
    const data = storage.get('DETAIL');
    if (data) setDataDetail(Decryption(data));
  }, []);

  const dataUrl: BreadCumbs[] = [
    {
      id: 0,
      url: '/articles',
      text: 'Articles',
    },
    {
      id: 1,
      url: null,
      text: dataDetail?.title,
    },
  ];

  return (
    <Layout isLoading={dataDetail ? false : true}>
      <Container>
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="container px-5 lg:px-[90px] mx-auto">
            <BreadCrumbs dataUrl={dataUrl} />
            <div className="lg:w-full mx-auto flex flex-wrap">
              <img
                alt="image-detail"
                className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                src={dataDetail?.imageUrl}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {dataDetail?.title}
                </h1>
                <p className="leading-relaxed mt-4">{dataDetail?.abstract}</p>
                <div className="flex mt-6">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    {formatDate(dataDetail?.publishDate || '')}
                  </span>
                  <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                    Button
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
}
