import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getComments, createComment } from 'domains/movie/movie.services';
import { useAuth } from 'domains/auth/auth.state';

export const useComments = (movieId) => {
  const query = useQuery("comments", () => getComments(movieId), { staleTime: 1000 });
  
  return {
    ...query
  }
}

export const useCreateComment = () => {
  const { accessToken } = useAuth();
  
  return function invokeCreate({rating, movieId, content}) {
    return createComment({rating, movieId, content}, {token: accessToken});
  }
}

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  const createComment = useCreateComment();
  
  return useMutation(createComment, { onSuccess: () => queryClient.invalidateQueries('comments') });
};