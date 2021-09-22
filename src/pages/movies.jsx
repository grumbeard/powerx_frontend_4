import * as React from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from 'domains/movie/hooks/use-movies';
import { MovieCard } from 'domains/movie/components/movie-card';


export const Movies = () => {
  const { data: movies, status, page, setPage } = useMovies();
  
  return (
    <div className="grid lg:grid-cols-5 gap-10">
      {movies && movies.map(movie =>
        <Link to={`/movie/${movie._id}`} key={movie._id}>
          <MovieCard movie={movie} />
        </Link>
      )}
    </div>
  );
};