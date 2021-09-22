import { useState } from 'react';
import { useQuery } from 'react-query';
import { getMovies } from 'domains/movie/movie.services';

export const useMovies = () => {
  const [page, setPage] = useState(1);
  
  const query = useQuery(["movies", page], () => {
    // Async function for grabbing data
    return getMovies(page);
  }, { staleTime: 3000 })
  
  return {
    ...query,
    page,
    setPage
  };
};