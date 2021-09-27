import * as React from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from 'domains/movie/hooks/use-movies';
import { MovieCard } from 'domains/movie/components/movie-card';
import { Button } from 'components/button';

export const Movies = () => {
  const { data: movies, status, page, setPage } = useMovies();
  const PrevButton = (
    <Button
      disabled={page <= 1}
      onClick={() => setPage((prevNum) => prevNum - 1)}>
      Prev
    </Button>
  );
  
  const NextButton = (
    <Button
      disabled={!movies}
      onClick={() => setPage((prevNum) => prevNum + 1)}>
      Next
    </Button>
  );
  
  return (
    <>
      <div className="flex justify-between px-10 py-5">
        {PrevButton}
        {NextButton}
      </div>
      {status !== 'success' && (<div className='text-center'><h1>Loading...</h1></div>)}
      <div className="grid lg:grid-cols-5 gap-10">
        {movies && movies.map(movie =>
          <Link to={`/movie/${movie._id}`} key={movie._id}>
            <MovieCard movie={movie} />
          </Link>
        )}
      </div>
    </>
  );
};