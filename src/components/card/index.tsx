import React, { FC } from 'react';
import Button from '../button';
import { formatDate } from '@/common/lib/format';
import { Articles } from '@/features/articles/types';

type CardProps = {
  title: string;
  imageUrl: string;
  publishDate: string;
  abstract: string;
  id: number;
  onReadMore: (data: Articles) => void;
};

const Card: FC<CardProps> = ({ id, title, imageUrl, publishDate, abstract, onReadMore }) => {
  const dataDetail: Articles = {
    id,
    title,
    imageUrl,
    publishDate,
    abstract,
  };
  return (
    <div className="lg:flex" role="article">
      <img
        className="object-cover w-full h-56 rounded-lg lg:w-64"
        src={imageUrl}
        alt="image-article"
        loading="lazy"
      />

      <div className="flex flex-col justify-between py-6 lg:mx-6">
        <p
          onClick={() => onReadMore(dataDetail)}
          className="text-xl font-semibold text-gray-800 dark:text-white "
        >
          {title}
        </p>

        <span className="text-sm text-gray-500 dark:text-gray-300">
          Published On: {formatDate(publishDate || '')}
        </span>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Button
            text="Read More"
            type="button"
            onClick={() => onReadMore(dataDetail)}
            variant="info"
          />
          <Button text="Buy Article" type="button" onClick={() => {}} variant="success" />
        </div>
      </div>
    </div>
  );
};

export default Card;
