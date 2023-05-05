import { formatToMoney } from '@/common/lib/format';
import { GetDataUser } from '@/helpers';
import { FC, useEffect, useState } from 'react';

const dataUser = GetDataUser();

const Header: FC = () => {
  const [coin, setCoin] = useState(0);

  useEffect(() => {
    setCoin(dataUser?.totalCoin || 0);
  }, [dataUser]);

  return (
    <header className="flex justify-between p-5 font-bold shadow-md">
      <section>
        <h1>NY | Book</h1>
      </section>
      <section className="flex justify-between">
        <div className="px-6">Article</div>
        <div className="px-6">History</div>
        <div className="px-6">Gatcha</div>
      </section>
      <section>
        <p>Coin: {formatToMoney(coin)}</p>
      </section>
    </header>
  );
};

export default Header;
