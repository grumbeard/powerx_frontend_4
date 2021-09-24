import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getComments, createComment, deleteComment } from 'domains/movie/movie.services';
import { useAuth } from 'domains/auth/auth.state';

export const useComments = (movieId) => {
  const query = useQuery("comments", () => getComments(movieId), { staleTime: 1000 });
  
  return {
    ...query
  }
}

const useCreateComment = () => {
  const { accessToken } = useAuth();
  
  return function invokeCreate({rating, movieId, content}) {
    return createComment({rating, movieId, content}, {token: accessToken});
  }
}

const useDeleteComment = () => {
  const { accessToken } = useAuth();
  
  return function invokeDelete(commentId) {
    return deleteComment(commentId, {token: accessToken});
  }
}

export const useCommentMutation = (type) => {
  const queryClient = useQueryClient();
  const createFn = useCreateComment();
  const deleteFn = useDeleteComment();
  let mutatingFunction;
  
  switch(type) {
    case 'create':
      mutatingFunction = createFn;
      break;
    case 'delete':
      mutatingFunction = deleteFn;
      break;
    default:
      console.log('Unable to mutate comment');
  }
  
  return useMutation(mutatingFunction, { onSuccess: () => queryClient.invalidateQueries('comments') });
};