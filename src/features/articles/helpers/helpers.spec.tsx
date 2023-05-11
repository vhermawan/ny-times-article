import { CountDiffDays } from '@/helpers';
import { countLimitFreeArticle, getTicket, mappingData, mappingPriceArticle } from '.';

jest.mock('@/helpers', () => ({
  CountDiffDays: jest.fn(),
}));

describe('mappingData', () => {
  it('maps the data correctly when isSearch is true', () => {
    const dataArticle = {
      response: {
        docs: [
          {
            headline: { main: 'Article 1' },
            abstract: 'Abstract 1',
            multimedia: [{ url: 'image1.jpg' }],
            pub_date: '2023-05-11',
            web_url: 'article-url-1',
          },
          {
            headline: { main: 'Article 2' },
            abstract: 'Abstract 2',
            multimedia: [],
            pub_date: '2023-05-11',
            web_url: 'article-url-2',
          },
        ],
      },
    };

    const mockMappingPriceArticle = jest.fn();
    jest.mock('.', () => ({
      mappingPriceArticle: mockMappingPriceArticle,
    }));

    const result = mappingData(dataArticle, true);

    expect(result).toEqual([
      {
        title: 'Article 1',
        id: 0,
        abstract: 'Abstract 1',
        imageUrl: 'http://www.nytimes.com/image1.jpg',
        publishDate: '11 May 2023',
        articleUrl: 'article-url-1',
        priceArticle: 0,
      },
      {
        title: 'Article 2',
        id: 1,
        abstract: 'Abstract 2',
        imageUrl: 'https://i.pinimg.com/736x/4a/e7/af/4ae7af8e6f4f683a3090b8dd3da7889f.jpg',
        publishDate: '11 May 2023',
        articleUrl: 'article-url-2',
        priceArticle: 0,
      },
    ]);
  });

  it('maps the data correctly when isSearch is false', () => {
    const dataArticle = {
      results: [
        {
          title: 'Article 3',
          abstract: 'Abstract 3',
          media: [
            {
              'media-metadata': [{ url: 'image3.jpg' }, { url: 'image3.jpg' }],
            },
          ],
          published_date: '2023-05-03',
          url: 'article-url-3',
        },
        {
          title: 'Article 4',
          abstract: 'Abstract 4',
          media: [],
          published_date: '2023-05-04',
          url: 'article-url-4',
        },
      ],
    };

    const mockMappingPriceArticle = jest.fn();
    jest.mock('.', () => ({
      mappingPriceArticle: mockMappingPriceArticle,
    }));

    const result = mappingData(dataArticle, false);

    expect(result).toEqual([
      {
        title: 'Article 3',
        id: 0,
        abstract: 'Abstract 3',
        imageUrl: 'https://i.pinimg.com/736x/4a/e7/af/4ae7af8e6f4f683a3090b8dd3da7889f.jpg',
        publishDate: '3 May 2023',
        articleUrl: 'article-url-3',
        priceArticle: 0,
      },
      {
        title: 'Article 4',
        id: 1,
        abstract: 'Abstract 4',
        imageUrl: 'https://i.pinimg.com/736x/4a/e7/af/4ae7af8e6f4f683a3090b8dd3da7889f.jpg',
        publishDate: '4 May 2023',
        articleUrl: 'article-url-4',
        priceArticle: 0,
      },
    ]);
  });
});

describe('mappingPriceArticle', () => {
  it('returns the correct price based on the number of days', () => {
    (CountDiffDays as jest.Mock).mockReturnValue(1);
    expect(mappingPriceArticle('2023-05-01')).toBe(50000);

    (CountDiffDays as jest.Mock).mockReturnValue(5);
    expect(mappingPriceArticle('2023-05-01')).toBe(20000);

    (CountDiffDays as jest.Mock).mockReturnValue(10);
    expect(mappingPriceArticle('2023-05-01')).toBe(0);
  });
});

describe('countLimitFreeArticle', () => {
  it('returns the correct limit free based on the number of days', () => {
    (CountDiffDays as jest.Mock).mockReturnValue(1);
    expect(countLimitFreeArticle('2023-05-01', 4)).toBe(4);

    (CountDiffDays as jest.Mock).mockReturnValue(8);
    expect(countLimitFreeArticle('2023-05-01', 4)).toBe(3);
  });
});

describe('getTicket', () => {
  it('returns the correct total ticket', () => {
    expect(getTicket(50000)).toBe(3);

    expect(getTicket(0)).toBe(0);
  });
});
