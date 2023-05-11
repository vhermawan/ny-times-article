import React, { FC } from 'react';
import Button from '../button';

export type CardProps = {
  data: Articles;
  onReadMore: (data: Articles) => void;
};

const Card: FC<CardProps> = ({ data, onReadMore }) => {
  return (
    <div className="lg:flex" role="article">
      <img
        className="object-cover w-full h-56 rounded-lg lg:w-64"
        src={data.imageUrl}
        alt="image-article"
        loading="lazy"
      />
      <div className="flex flex-col justify-between py-6 lg:mx-6">
        <p className="text-xl font-semibold text-gray-800 dark:text-white ">{data.title}</p>
        <span className="text-sm text-gray-500 dark:text-gray-300">
          Published On: {data.publishDate}
        </span>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Button text="Read More" type="button" onClick={() => onReadMore(data)} variant="info" />
        </div>
      </div>
    </div>
  );
};

export default Card;
