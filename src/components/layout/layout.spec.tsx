import React from 'react';
import { render } from '@testing-library/react';
import Layout from './index';
import { InitializeData } from '../../helpers';

jest.mock('../../helpers', () => ({
  InitializeData: jest.fn(),
  GetDataUser: jest.fn(),
}));

describe('Layout', () => {
  it('should call InitializeData on mount', () => {
    render(<Layout>Test</Layout>);
    expect(InitializeData).toHaveBeenCalledTimes(1);
  });
});
