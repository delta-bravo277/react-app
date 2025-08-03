import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseGoals from './CourseGoals';

describe('CourseGoals Component', () => {
  const mockOnDeleteGoal = jest.fn();

  beforeEach(() => {
    mockOnDeleteGoal.mockClear();
  });

  test('renders the component title', () => {
    render(<CourseGoals goals={[]} onDeleteGoal={mockOnDeleteGoal} />);
    
    expect(screen.getByText('Your Goals')).toBeInTheDocument();
  });

  test('displays "No goals found" message when goals array is empty', () => {
    render(<CourseGoals goals={[]} onDeleteGoal={mockOnDeleteGoal} />);
    
    expect(screen.getByText('No goals found. Start adding some!')).toBeInTheDocument();
  });



  test('renders a single goal', () => {
    const goals = [{ id: '1', text: 'Learn React' }];
    
    render(<CourseGoals goals={goals} onDeleteGoal={mockOnDeleteGoal} />);
    
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.queryByText('No goals found. Start adding some!')).not.toBeInTheDocument();
  });

  test('renders multiple goals', () => {
    const goals = [
      { id: '1', text: 'Learn React' },
      { id: '2', text: 'Master Testing' },
      { id: '3', text: 'Build Projects' },
    ];
    
    render(<CourseGoals goals={goals} onDeleteGoal={mockOnDeleteGoal} />);
    
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Master Testing')).toBeInTheDocument();
    expect(screen.getByText('Build Projects')).toBeInTheDocument();
    expect(screen.queryByText('No goals found. Start adding some!')).not.toBeInTheDocument();
  });

  test('passes correct props to GoalItem components', () => {
    const goals = [
      { id: '1', text: 'Learn React' },
      { id: '2', text: 'Master Testing' },
    ];
    
    render(<CourseGoals goals={goals} onDeleteGoal={mockOnDeleteGoal} />);
    
    // Check that goals are rendered (this indirectly tests prop passing)
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Master Testing')).toBeInTheDocument();
  });

  test('renders goals in the correct order', () => {
    const goals = [
      { id: '1', text: 'First Goal' },
      { id: '2', text: 'Second Goal' },
      { id: '3', text: 'Third Goal' },
    ];
    
    render(<CourseGoals goals={goals} onDeleteGoal={mockOnDeleteGoal} />);
    
    const goalElements = screen.getAllByRole('listitem');
    
    expect(goalElements).toHaveLength(3);
    expect(goalElements[0]).toHaveTextContent('First Goal');
    expect(goalElements[1]).toHaveTextContent('Second Goal');
    expect(goalElements[2]).toHaveTextContent('Third Goal');
  });

  test('handles goals with special characters', () => {
    const goals = [
      { id: '1', text: 'Learn React & Testing!' },
      { id: '2', text: 'Master <JavaScript>' },
      { id: '3', text: 'Build "Awesome" Projects' },
    ];
    
    render(<CourseGoals goals={goals} onDeleteGoal={mockOnDeleteGoal} />);
    
    expect(screen.getByText('Learn React & Testing!')).toBeInTheDocument();
    expect(screen.getByText('Master <JavaScript>')).toBeInTheDocument();
    expect(screen.getByText('Build "Awesome" Projects')).toBeInTheDocument();
  });

  test('handles goals with long text', () => {
    const goals = [
      { 
        id: '1', 
        text: 'This is a very long goal text that should be displayed properly in the component without any issues' 
      },
    ];
    
    render(<CourseGoals goals={goals} onDeleteGoal={mockOnDeleteGoal} />);
    
    expect(screen.getByText('This is a very long goal text that should be displayed properly in the component without any issues')).toBeInTheDocument();
  });

  test('renders goals with numeric IDs', () => {
    const goals = [
      { id: 1, text: 'Learn React' },
      { id: 2, text: 'Master Testing' },
    ];
    
    render(<CourseGoals goals={goals} onDeleteGoal={mockOnDeleteGoal} />);
    
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Master Testing')).toBeInTheDocument();
  });

  test('renders goals with string IDs', () => {
    const goals = [
      { id: 'goal-1', text: 'Learn React' },
      { id: 'goal-2', text: 'Master Testing' },
    ];
    
    render(<CourseGoals goals={goals} onDeleteGoal={mockOnDeleteGoal} />);
    
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Master Testing')).toBeInTheDocument();
  });


}); 