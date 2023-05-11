import { LIST_TYPE_ARTICLES, LIST_PERIOD_ARTICLES } from './';

describe('LIST_TYPE_ARTICLES', () => {
  it('contains the expected number of options', () => {
    expect(LIST_TYPE_ARTICLES).toHaveLength(4);
  });

  it('contains the expected options', () => {
    const expectedOptions = [
      { label: 'All', value: 'all' },
      { label: 'Emailed', value: 'emailed' },
      { label: 'Shared', value: 'shared' },
      { label: 'Viewed', value: 'viewed' },
    ];

    expect(LIST_TYPE_ARTICLES).toEqual(expectedOptions);
  });
});

describe('LIST_PERIOD_ARTICLES', () => {
  it('contains the expected number of options', () => {
    expect(LIST_PERIOD_ARTICLES).toHaveLength(3);
  });

  it('contains the expected options', () => {
    const expectedOptions = [
      { label: 'Today', value: '1' },
      { label: 'A Week', value: '7' },
      { label: 'A Month', value: '30' },
    ];

    expect(LIST_PERIOD_ARTICLES).toEqual(expectedOptions);
  });
});
