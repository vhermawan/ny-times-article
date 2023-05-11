import { render, screen, fireEvent } from '@testing-library/react';
import GatchaPage from '@/features/gatcha/index';
import React, { useState } from 'react';

jest.mock('@/context', () => ({
  useGlobalContext: jest.fn(),
}));

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Create a global mock instance of ResizeObserver
global.ResizeObserver = ResizeObserverMock;

describe('GatchaPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', () => {
    const user = { totalTicket: 1, totalCoin: 0 };
    const setDataUser = jest.fn();
    jest.spyOn(require('@/context'), 'useGlobalContext').mockReturnValue({
      user: user,
      setDataUser: setDataUser,
    });
    render(<GatchaPage />);

    expect(screen.getByText('Redeem your ticket')).toBeInTheDocument();
  });

  it('handles button click and shows lucky result', () => {
    const user = { totalTicket: 1, totalCoin: 0 };
    const setDataUser = jest.fn();
    jest.spyOn(require('@/context'), 'useGlobalContext').mockReturnValue({ user, setDataUser });
    render(<GatchaPage />);

    fireEvent.click(screen.getByText('Redeem'));

    expect(setDataUser).toHaveBeenCalledWith({ totalTicket: 0, totalCoin: expect.any(Number) });
  });

  it('handles button click and shows empty ticket', () => {
    const user = { totalTicket: 0, totalCoin: 0 };
    const setDataUser = jest.fn();
    jest.spyOn(require('@/context'), 'useGlobalContext').mockReturnValue({ user, setDataUser });
    render(<GatchaPage />);

    fireEvent.click(screen.getByText('Redeem'));

    expect(screen.getByText(/Your ticket is empty/i)).toBeInTheDocument();
  });
});
