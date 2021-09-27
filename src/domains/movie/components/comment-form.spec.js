import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CommentForm } from './comment-form';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from "domains/auth/auth.state";

test('Comment Form loads with initial state of {rating: "1", content: ""}', () => {
  const queryClient = new QueryClient();
  const movieId = 'someMovieId';
  const {container} = render(
    <QueryClientProvider client={queryClient} >
      <AuthProvider>
        <CommentForm movieId={movieId} />
      </AuthProvider>
    </QueryClientProvider>
  );
  
  expect(container.firstChild.nodeName).toBe('FORM');
  expect(screen.getByLabelText(/rating/i).value).toBe('1');
  expect(screen.getByLabelText(/comment/i).value).toBe('');
});

test('Submitting Comment Form with empty content results in validation error', async () => {
  const queryClient = new QueryClient();
  const movieId = 'someMovieId';
  render(
    <QueryClientProvider client={queryClient} >
      <AuthProvider>
        <CommentForm movieId={movieId} />
      </AuthProvider>
    </QueryClientProvider>
  );

  // Submit form with empty content
  fireEvent.change(screen.getByLabelText(/comment/i), { target: { value: '' } });
  fireEvent.click(screen.getByRole('button', { type: /submit/i }));
  
  // Input validation error message for content field appears
  await waitFor(() => expect(screen.getByText('Comments Required')).toBeInTheDocument());
});

test('Submitting Comment Form with non-empty content does not result in validation error for content', async () => {
  const queryClient = new QueryClient();
  const movieId = 'someMovieId';
  render(
    <QueryClientProvider client={queryClient} >
      <AuthProvider>
        <CommentForm movieId={movieId} />
      </AuthProvider>
    </QueryClientProvider>
  );
  
  // Submit form with non-empty content
  fireEvent.change(screen.getByLabelText(/comment/i), { target: { value: 'Some comment' } });
  fireEvent.click(screen.getByRole('button', { type: /submit/i }));
  
  await waitFor(() => expect(screen.queryByText('Comments Required')).not.toBeInTheDocument());
});

test('Submitting Comment Form with empty rating results in validation error', async () => {
  const queryClient = new QueryClient();
  const movieId = 'someMovieId';
  render(
    <QueryClientProvider client={queryClient} >
      <AuthProvider>
        <CommentForm movieId={movieId} />
      </AuthProvider>
    </QueryClientProvider>
  );

  // Submit form with empty content
  fireEvent.change(screen.getByLabelText(/rating/i), { target: { value: '' } });
  fireEvent.click(screen.getByRole('button', { type: /submit/i }));
  
  // Input validation error message for content field appears
  await waitFor(() => expect(screen.getByText('Rating Required')).toBeInTheDocument());
});
