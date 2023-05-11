import { render, screen, fireEvent } from '@testing-library/react';
import DetailArticle from '../pages/articles/[slug]';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  push: jest.fn(),
}));

jest.mock('@/common/lib/storage', () => ({
  storage: {
    get: jest
      .fn()
      .mockReturnValue(
        'eyJ0aXRsZSI6IkUuIEplYW4gQ2Fycm9sbCBNYXkgU3VlIFRydW1wIGEgVGhpcmQgVGltZSBBZnRlciDigJhWaWxl4oCZIENvbW1lbnRzIG9uIENOTiIsImlkIjoyLCJhYnN0cmFjdCI6IkluIGFuIGludGVydmlldywgaGVyIGxhd3llciBzYWlkIHRoYXQgdGhlIGZvcm1lciBwcmVzaWRlbnTigJlzIG1vY2tpbmcgY29tbWVudHMgaW4gYSB0b3duIGhhbGwgYnJvYWRjYXN0IGNvdWxkIGNyZWF0ZSBmcmVzaCBsZWdhbCBqZW9wYXJkeS4iLCJpbWFnZVVybCI6Imh0dHA6Ly93d3cubnl0aW1lcy5jb20vaW1hZ2VzLzIwMjMvMDUvMTEvbnlyZWdpb24vMTFUcnVtcC1DYXJyb2xsLWludGVydmlldzIvMTFUcnVtcC1DYXJyb2xsLWludGVydmlldzItYXJ0aWNsZUxhcmdlLmpwZyIsInB1Ymxpc2hEYXRlIjoiMTIgTWF5IDIwMjMiLCJhcnRpY2xlVXJsIjoiaHR0cHM6Ly93d3cubnl0aW1lcy5jb20vMjAyMy8wNS8xMS9ueXJlZ2lvbi9lLWplYW4tY2Fycm9sbC10cnVtcC1kZWZhbWF0aW9uLmh0bWwiLCJwcmljZUFydGljbGUiOjUwMDAwfQ==',
      ),
    set: jest.fn(),
  },
}));

jest.mock('@/context', () => ({
  useGlobalContext: jest.fn().mockReturnValue({
    setDataUser: jest.fn(),
    user: {
      books: {
        list: [],
      },
      totalCoin: 100,
      totalTicket: 0,
      limitFree: 3,
    },
  }),
}));

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Create a global mock instance of ResizeObserver
global.ResizeObserver = ResizeObserverMock;

describe('DetailArticle', () => {
  test('renders article details correctly', () => {
    const dataDetail = {
      id: 1,
      abstract:
        'In an interview, her lawyer said that the former president’s mocking comments in a town hall broadcast could create fresh legal jeopardy.',
      title: 'E. Jean Carroll May Sue Trump a Third Time After ‘Vile’ Comments on CNN',
      imageUrl:
        'http://www.nytimes.com/images/2023/05/11/nyregion/11Trump-Carroll-interview2/11Trump-Carroll-interview2-articleLarge.jpg',
      articleUrl: 'https://example.com/article',
      priceArticle: 10,
      publishDate: '2023-05-10',
    };

    render(<DetailArticle />);

    expect(screen.getByAltText('image-detail')).toHaveAttribute('src', dataDetail.imageUrl);
    expect(screen.getByText(/buy article/i)).toBeInTheDocument();
  });
});
