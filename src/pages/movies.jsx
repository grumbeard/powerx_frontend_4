import { useMovies } from 'domains/movie/hooks/use-movies';
import * as React from 'react';


export const Movies = () => {
  const { data: movies, status, page, setPage } = useMovies();
  
  return (
    <div>
      {movies && movies.map(movie => <div key={movie._id}>{[movie.releaseDate, ": ", movie.title]}</div>)}
    </div>
  );
};