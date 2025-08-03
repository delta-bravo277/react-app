import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import GoalInput from './GoalInput';

describe('GoalInput Component', () => {
  const mockOnAddGoal = jest.fn();

  beforeEach(() => {
    mockOnAddGoal.mockClear();
  });

  test('renders the form with input and button', () => {
    render(<GoalInput onAddGoal={mockOnAddGoal} />);
    
    expect(screen.getByLabelText('New Goal')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Goal' })).toBeInTheDocument();
  });




















}); 