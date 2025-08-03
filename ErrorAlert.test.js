import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorAlert from './ErrorAlert';

describe('ErrorAlert Component', () => {


  test('displays the error title', () => {
    render(<ErrorAlert errorText="Test error message" />);
    
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });

  test('displays the error message from props', () => {
    const errorMessage = 'This is a test error message';
    render(<ErrorAlert errorText={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('displays different error messages', () => {
    const errorMessages = [
      'Network error occurred',
      'Server is not responding',
      'Invalid data format',
      'Authentication failed',
    ];

    errorMessages.forEach((message) => {
      const { unmount } = render(<ErrorAlert errorText={message} />);
      
      expect(screen.getByText(message)).toBeInTheDocument();
      
      unmount();
    });
  });

  test('displays long error messages', () => {
    const longErrorMessage = 'This is a very long error message that contains multiple sentences and should be displayed properly in the error alert component without any issues or truncation. It should wrap correctly and remain readable.';
    
    render(<ErrorAlert errorText={longErrorMessage} />);
    
    expect(screen.getByText(longErrorMessage)).toBeInTheDocument();
  });

  test('displays error message with special characters', () => {
    const errorMessage = 'Error: Invalid input <script>alert("xss")</script> & special chars!';
    
    render(<ErrorAlert errorText={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('displays error message with numbers', () => {
    const errorMessage = 'Error 404: Page not found. Status code: 500';
    
    render(<ErrorAlert errorText={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });





  test('renders multiple error alerts with different messages', () => {
    const { rerender } = render(<ErrorAlert errorText="First error" />);
    
    expect(screen.getByText('First error')).toBeInTheDocument();
    
    rerender(<ErrorAlert errorText="Second error" />);
    
    expect(screen.getByText('Second error')).toBeInTheDocument();
    expect(screen.queryByText('First error')).not.toBeInTheDocument();
  });



  test('handles error messages with HTML entities', () => {
    const errorMessage = 'Error: &lt;script&gt;alert("xss")&lt;/script&gt;';
    
    render(<ErrorAlert errorText={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
}); 