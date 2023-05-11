import Container from '@/components/container';
import Layout from '@/components/layout';
import { FC, Fragment, useRef, useState } from 'react';

import { useGlobalContext } from '@/context';
import { storage } from '@/common/lib/storage';
import { Encryption } from '@/helpers';
import { formatToMoney } from '@/common/lib/format';
import Modal from '@/components/modal';
import Button from '@/components/button';
import { LUCKY_AMOUNT, MAX_AMOUNT, MIN_AMOUNT } from './constant';

const GatchaPage: FC = () => {
  const { user, setDataUser } = useGlobalContext();
  const [showGacha, setShowGacha] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [amountGatcha, setAmountGatcha] = useState<number[]>([]);

  const amounts = useRef([50000, 20000, 10000, 13, 0]);

  const getRandomAmount = (): number => {
    const randomIndex = Math.floor(Math.random() * amounts.current.length);

    const amount = amounts.current[randomIndex];

    if (amount === MAX_AMOUNT) amounts.current = [20000, 10000, 13, 0];

    return amount;
  };

  const getRandomAmountSpecial = (): number[] => {
    const amountRange = (MAX_AMOUNT - MIN_AMOUNT) / 1000;
    const amountsList: number[] = [];
    for (let i = 0; i < 3; i++) {
      let randomAmount = Math.floor(Math.random() * amountRange) * 1000;
      amountsList.push(randomAmount);
    }
    return amountsList;
  };

  const handleButtonClick = (): void => {
    let randomAmount = getRandomAmount();
    let listAmount: number[] = [];
    let dataUser = user;

    if (dataUser.totalTicket <= 0) return setShowMessage(true);

    if (randomAmount === LUCKY_AMOUNT) {
      const amountSpecial = getRandomAmountSpecial();
      amountSpecial.forEach(data => listAmount.push(data));

      randomAmount = amountSpecial.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
      );
    } else {
      listAmount.push(randomAmount);
    }

    dataUser.totalTicket -= 1;
    dataUser.totalCoin += randomAmount;

    setAmountGatcha(listAmount);
    setDataUser(dataUser);
    storage.set('USER_DATA', Encryption(dataUser));
    setShowGacha(true);
  };

  return (
    <Layout isLoading={false}>
      <Container>
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Redeem your ticket
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Reedem your ticket and get more coint, if you never try you will never know!
              </p>
              <div className="mt-4 flex items-center justify-center gap-x-6">
                <Button onClick={handleButtonClick} text="Redeem" type="button" variant="info" />
              </div>
            </div>
            {showGacha && (
              <div className="sm:mt-8 sm:flex sm:justify-center gap-4 p-4 w-fit h-fit mx-auto">
                {amountGatcha.map(data => (
                  <Fragment key={data}>
                    <div className="relative rounded-lg h-[200px] w-[200px] px-3 py-1 text-sm leading-6 bg-gradient-to-tr from-[#ff80b5] to-[#2313ff] text-white ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                      <div className="flex flex-col justify-center h-full m-auto text-center">
                        {data === 0 ? (
                          <h1 className="font-bold">You are unlucky, please try again 😋</h1>
                        ) : (
                          <>
                            <h1 className="font-bold">Congrats 🎉 yout got</h1>
                            <p className="text-2xl font-bold">{formatToMoney(data)} Coin</p>
                          </>
                        )}
                      </div>
                    </div>
                  </Fragment>
                ))}
                <button onClick={() => setShowGacha(false)} className="relative h-5 w-5">
                  <h1>X</h1>
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
      <Modal
        onClose={() => setShowMessage(false)}
        isOpen={showMessage}
        titleModal="Failed to reedem ticket"
        variant="danger"
      >
        <div className="flex flex-col mt-4 gap-2">
          <p>Your ticket is empty</p>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            text="Close"
            type="button"
            onClick={() => setShowMessage(false)}
            variant="warning"
          />
        </div>
      </Modal>
    </Layout>
  );
};

export default GatchaPage;
