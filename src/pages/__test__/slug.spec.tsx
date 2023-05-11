import { render, screen, fireEvent } from '@testing-library/react';
import DetailArticle from '../articles/[slug]';

describe('DetailArticle', () => {
  it('renders the article details correctly', () => {
    // Mocked data
    const dataDetail = {
      id: 1,
      abstract: 'Article abstract',
      title: 'Article Title',
      imageUrl: 'image-url.jpg',
      articleUrl: 'article-url',
      priceArticle: 10,
      publishDate: '2023-05-11',
    };

    // Mock the useRouter hook
    jest.mock('next/router', () => ({
      push: jest.fn(),
    }));

    // Render the component
    render(<DetailArticle />);

    // Set the article details in local storage
    window.localStorage.setItem('DETAIL', JSON.stringify(dataDetail));

    // Assert that the article details are rendered correctly
    expect(screen.getByText('Article Title')).toBeInTheDocument();
    expect(screen.getByText('Article abstract')).toBeInTheDocument();
    expect(screen.getByText('11 May 2023')).toBeInTheDocument();
  });

  it('opens the confirmation modal when clicking the "Buy Article" button', () => {
    // Mocked data
    const dataDetail = {
      id: 1,
      abstract: 'Article abstract',
      title: 'Article Title',
      imageUrl: 'image-url.jpg',
      articleUrl: 'article-url',
      priceArticle: 10,
      publishDate: '2023-05-11',
    };

    // Mock the useRouter hook
    jest.mock('next/router', () => ({
      push: jest.fn(),
    }));

    // Render the component
    render(<DetailArticle />);

    // Set the article details in local storage
    window.localStorage.setItem('DETAIL', JSON.stringify(dataDetail));

    // Click the "Buy Article" button
    fireEvent.click(screen.getByText('Buy Article'));

    // Assert that the confirmation modal is opened
    expect(screen.getByText('Are you sure want to buy this article?')).toBeInTheDocument();
    expect(
      screen.getByText('You will buy article Article Title are you sure?'),
    ).toBeInTheDocument();
  });
});
