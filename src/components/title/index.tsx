import { FC } from 'react';

type TitleProps = {
  title: string;
};

const Title: FC<TitleProps> = ({ title }) => {
  return (
    <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
      {title}
    </h1>
  );
};

export default Title;
