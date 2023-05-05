require('@testing-library/jest-dom/extend-expect');

global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({}) }));

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {},
}));

jest.mock('next/router', () => require('next-router-mock'));
