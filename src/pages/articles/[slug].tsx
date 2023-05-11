import { formatDate } from '@/common/lib/format';
import { storage } from '@/common/lib/storage';
import BreadCrumbs from '@/components/breadcumbs';
import Button from '@/components/button';
import Container from '@/components/container';
import Layout from '@/components/layout';
import { useGlobalContext } from '@/context';
import { countLimitFreeArticle, getTicket } from '@/features/articles/helpers';
import { Decryption, Encryption } from '@/helpers';
import { useEffect, useState } from 'react';
import router from 'next/router';
import Modal, { Variant } from '@/components/modal';

export default function DetailArticle() {
  const { setDataUser, user } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [modalMessage, setModalMessage] = useState<{
    message: string;
    isOpen: boolean;
    title: string;
    variant: Variant;
  }>({
    title: '',
    message: '',
    isOpen: false,
    variant: 'success',
  });
  const [dataDetail, setDataDetail] = useState<Articles>({
    id: 0,
    abstract: '',
    title: '',
    imageUrl: '',
    articleUrl: '',
    priceArticle: 0,
    publishDate: '',
  });

  useEffect(() => {
    const data = storage.get('DETAIL');
    if (data) {
      setDataDetail(Decryption(data));
      setIsLoading(false);
    } else router.push('/articles');
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

  const onConfirmBuyArticle = (data: Articles): void => {
    const isBookBuyed = user.books.list.find(list => list.title === data.title);

    setModalMessage(prevState => ({
      ...prevState,
      title: 'Failed to buy this article',
      variant: 'danger',
    }));

    if (isBookBuyed)
      setModalMessage(prevState => ({
        ...prevState,
        isOpen: true,
        message: 'This article already buyed!',
      }));
    else if (user.totalCoin < data.priceArticle)
      setModalMessage(prevState => ({
        ...prevState,
        isOpen: true,
        message: 'Your coint is not enough to buy this article!',
      }));
    else if (user.limitFree === 0)
      setModalMessage(prevState => ({
        ...prevState,
        isOpen: true,
        message: 'Your quota limit is empty!',
      }));
    else setIsOpenConfirm(true);
  };

  const onBuyArticle = (data: Articles): void => {
    let dataUser = user;
    const book: Articles = {
      id: dataUser.books.list.length,
      title: data.title,
      imageUrl: data.imageUrl,
      publishDate: data.publishDate,
      abstract: data.abstract,
      articleUrl: data.articleUrl,
      priceArticle: data.priceArticle,
    };
    const bonusTicket = getTicket(data.priceArticle);
    const quotaLimit = countLimitFreeArticle(data.publishDate, dataUser.limitFree);

    dataUser.books.list.push(book);
    dataUser.totalCoin -= data.priceArticle;
    dataUser.totalTicket += bonusTicket;
    dataUser.limitFree = quotaLimit;
    setDataUser(dataUser);
    storage.set('USER_DATA', Encryption(dataUser));
    setIsOpenConfirm(false);
    setModalMessage({
      variant: 'success',
      title: 'Success buying',
      isOpen: true,
      message: 'Your article has been success buyed!',
    });
  };

  return (
    <Layout isLoading={isLoading}>
      <Container>
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="container px-5 lg:px-[90px] mx-auto mt-24">
            <BreadCrumbs dataUrl={dataUrl} />
            <div className="lg:w-full mx-auto flex flex-wrap">
              <img
                alt="image-detail"
                className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                src={dataDetail?.imageUrl}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 sm:py-6 lg:py-6 mt-6 lg:mt-0">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {dataDetail?.title}
                </h1>
                <p className="leading-relaxed mt-4">{dataDetail?.abstract}</p>
                <div className="flex justify-between mt-6">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    {formatDate(dataDetail?.publishDate || '')}
                  </span>
                  <Button
                    text="Buy Article"
                    type="button"
                    onClick={() => onConfirmBuyArticle(dataDetail)}
                    variant="success"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>

      {/* Modal for confirm buy article */}
      <Modal
        onClose={() => setIsOpenConfirm(false)}
        isOpen={isOpenConfirm}
        titleModal="Are you sure want to buy this article?"
        variant="info"
      >
        <div className="flex flex-col mt-4 gap-2">
          <p>
            You will buy article <span className=" italic font-bold">{dataDetail?.title}</span> are
            you sure?
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            text="Confirm"
            type="button"
            onClick={() => onBuyArticle(dataDetail)}
            variant="info"
          />
          <Button
            text="Cancel"
            type="button"
            onClick={() => setIsOpenConfirm(false)}
            variant="warning"
          />
        </div>
      </Modal>

      {/* Modal for message action */}
      <Modal
        onClose={() =>
          setModalMessage({ title: '', message: '', isOpen: false, variant: 'success' })
        }
        isOpen={modalMessage.isOpen}
        titleModal={modalMessage.title}
        variant={modalMessage.variant}
      >
        <div className="flex flex-col mt-4 gap-2">
          <p>{modalMessage.message}</p>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            text="Close"
            type="button"
            onClick={() =>
              setModalMessage({ title: '', message: '', isOpen: false, variant: 'success' })
            }
            variant="warning"
          />
        </div>
      </Modal>
    </Layout>
  );
}
