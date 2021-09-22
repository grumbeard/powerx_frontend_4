import { useQuery } from 'react-query';
import { getComments } from 'domains/movie/movie.services';

export const useComments = (movieId) => {
  const query = useQuery("comments", () => getComments(movieId), { staleTime: 1000 });
  
  return {
    ...query
  }
}