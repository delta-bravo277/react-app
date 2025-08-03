import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import GoalItem from './GoalItem';

describe('GoalItem Component', () => {
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  test('renders the goal text', () => {
    render(<GoalItem id="1" text="Learn React" onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Learn React')).toBeInTheDocument();
  });

  test('renders as a list item', () => {
    render(<GoalItem id="1" text="Learn React" onDelete={mockOnDelete} />);
    
    const listItem = screen.getByRole('listitem');
    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveClass('goal-item');
  });







  test('renders goal with special characters', () => {
    render(<GoalItem id="1" text="Learn React & Testing!" onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Learn React & Testing!')).toBeInTheDocument();
  });

  test('renders goal with HTML-like characters', () => {
    render(<GoalItem id="1" text="Learn <JavaScript> & <React>" onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Learn <JavaScript> & <React>')).toBeInTheDocument();
  });

  test('renders goal with quotes', () => {
    render(<GoalItem id="1" text="Learn React and JavaScript" onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Learn React and JavaScript')).toBeInTheDocument();
  });

  test('renders long goal text', () => {
    const longText = 'This is a very long goal text that should be displayed properly in the component without any issues or truncation';
    
    render(<GoalItem id="1" text={longText} onDelete={mockOnDelete} />);
    
    expect(screen.getByText(longText)).toBeInTheDocument();
  });

  test('renders empty goal text', () => {
    render(<GoalItem id="1" text="" onDelete={mockOnDelete} />);
    
    const listItem = screen.getByRole('listitem');
    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveTextContent('');
  });

  test('renders goal with numbers', () => {
    render(<GoalItem id="1" text="Learn React 18 and TypeScript 5" onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Learn React 18 and TypeScript 5')).toBeInTheDocument();
  });

  test('renders goal with emojis', () => {
    render(<GoalItem id="1" text="Learn React and Testing" onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Learn React and Testing')).toBeInTheDocument();
  });





  test('renders with different id types', () => {
    const testCases = [
      { id: 'string-id', text: 'String ID Goal' },
      { id: 123, text: 'Numeric ID Goal' },
      { id: 'goal-123', text: 'Hyphenated ID Goal' },
      { id: 'goal_123', text: 'Underscore ID Goal' },
    ];

    testCases.forEach(({ id, text }) => {
      const { unmount } = render(<GoalItem id={id} text={text} onDelete={mockOnDelete} />);
      
      expect(screen.getByText(text)).toBeInTheDocument();
      
      unmount();
    });
  });

  test('maintains proper DOM structure', () => {
    render(<GoalItem id="1" text="Learn React" onDelete={mockOnDelete} />);
    
    const listItem = screen.getByRole('listitem');
    expect(listItem.tagName).toBe('LI');
    expect(listItem).toHaveClass('goal-item');
    expect(listItem).toHaveTextContent('Learn React');
  });
}); 