import { useState } from 'react';
import { useQuery } from 'react-query';
import { getMovies, getMovie } from 'domains/movie/movie.services';

export const useMovies = () => {
  const [page, setPage] = useState(1);
  
  const query = useQuery(["movies", page], () => {
    // Async function for grabbing data
    return getMovies(page);
  })
  
  return {
    ...query,
    page,
    setPage
  };
};

export const useMovie = (movieId) => {
  const query = useQuery("movie", () => getMovie(movieId));
  
  return {
    ...query
  }
}