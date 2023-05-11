import { render, fireEvent } from '@testing-library/react';
import Card, { CardProps } from './index';

describe('Card', () => {
  const data: Articles = {
    imageUrl: 'example.jpg',
    title: 'Example Title',
    publishDate: '2023-05-11',
    id: 0,
    priceArticle: 10000,
    articleUrl: 'url',
    abstract: 'abstract',
  };

  const onReadMoreMock = jest.fn();

  const renderCard = (props: CardProps) => {
    return render(<Card {...props} />);
  };

  it('renders the card correctly', () => {
    const { getByText, getByRole } = renderCard({
      data,
      onReadMore: onReadMoreMock,
    });

    const imageElement = getByRole('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'example.jpg');
    expect(imageElement).toHaveAttribute('alt', 'image-article');

    const titleElement = getByText('Example Title');
    expect(titleElement).toBeInTheDocument();

    const publishDateElement = getByText('Published On: 2023-05-11');
    expect(publishDateElement).toBeInTheDocument();

    const buttonElement = getByText('Read More');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  it('calls onReadMore function when "Read More" button is clicked', () => {
    const { getByText } = renderCard({
      data,
      onReadMore: onReadMoreMock,
    });

    const buttonElement = getByText('Read More');
    fireEvent.click(buttonElement);

    expect(onReadMoreMock).toHaveBeenCalledTimes(1);
    expect(onReadMoreMock).toHaveBeenCalledWith(data);
  });
});
