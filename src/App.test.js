import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

// Mock fetch globally
global.fetch = jest.fn();

describe('App Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders the app title and form', () => {
    // Mock successful initial fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ goals: [] }),
    });

    render(<App />);
    
    expect(screen.getByText('New Goal')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Goal' })).toBeInTheDocument();
  });

  test('fetches and displays goals on mount', async () => {
    const mockGoals = [
      { id: '1', text: 'Learn React' },
      { id: '2', text: 'Master Testing' },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ goals: mockGoals }),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Learn React')).toBeInTheDocument();
      expect(screen.getByText('Master Testing')).toBeInTheDocument();
    });
  });

  test('displays error message when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
      expect(screen.getByText(/Network error/)).toBeInTheDocument();
    });
  });

  test('displays error message when server responds with error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Server error' }),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
      expect(screen.getByText(/Server error/)).toBeInTheDocument();
    });
  });









  test('shows loading state during operations', async () => {
    // Mock a slow initial fetch
    fetch.mockImplementationOnce(() => 
      new Promise(resolve => 
        setTimeout(() => resolve({
          ok: true,
          json: async () => ({ goals: [] }),
        }), 100)
      )
    );

    render(<App />);

    // Should show loading initially
    expect(screen.queryByText('Your Goals')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Your Goals')).toBeInTheDocument();
    });
  });

  test('displays "No goals found" message when no goals exist', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ goals: [] }),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('No goals found. Start adding some!')).toBeInTheDocument();
    });
  });
}); 