import { render } from '@testing-library/react';
import BreadCrumbs, { BreadCrumbsProps } from './index';

describe('BreadCrumbs', () => {
  const dataUrl: BreadCrumbsProps['dataUrl'] = [
    { id: 1, text: 'Home', url: '/' },
    { id: 2, text: 'Products', url: '/products' },
    { id: 3, text: 'Category', url: '/products/category' },
    { id: 4, text: 'Current Page', url: null },
  ];

  it('renders the breadcrumbs correctly', () => {
    const { container } = render(<BreadCrumbs dataUrl={dataUrl} />);
    const breadcrumbItems = container.querySelectorAll('li');

    expect(breadcrumbItems.length).toBe(dataUrl.length);

    dataUrl.forEach((data: BreadCumbs, index: number) => {
      const breadcrumbItem = breadcrumbItems[index];
      const anchorElement = breadcrumbItem.querySelector('a');
      const textElement = anchorElement ? anchorElement.textContent : breadcrumbItem.textContent;

      expect(textElement).toBe(data.text);
    });
  });
});
