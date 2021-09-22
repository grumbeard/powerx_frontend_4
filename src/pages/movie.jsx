import * as React from 'react';
import { useParams } from "react-router-dom";
import { useMovie } from 'domains/movie/hooks/use-movies';
import { Card, CardHeading, CardBody } from 'components/card';
import { Badge } from 'components/badge';

function extractYear(dateString) {
  const regex = /1|2\d{3}/;
  return dateString.match(regex);
}

export const Movie = () => {
  const { movieId } = useParams();
  const { data: movie, status } = useMovie(movieId);
  
  return(
    <>
    { movie && (
      <div style={{backgroundImage: `url(${movie.backdropUrl})`}} className="min-h-screen bg-gradient-to-br bg-cover flex justify-center">
        <div className="backdrop-filter backdrop-blur-sm lg:w-3/4 w-4/5 flex p-10 gap-10">
            <Card className="w-1/2">
              <img src={movie.posterUrl} alt="movie poster" />
            </Card>
            <Card className="w-1/2 p-10 bg-white relative">
              <CardHeading>
                {movie.adult
                  ? <Badge color="red" className="absolute right-10">Adult</Badge>
                  : <Badge color="green" className="absolute right-10">Child-Friendly</Badge>
                }
                <h1>{movie.title}</h1>
                <h2>{extractYear(movie.releaseDate)}</h2>
              </CardHeading>
              <CardBody>
                <p>{movie.overview}</p>
                <br/>
                <p>Released: {movie.releaseDate}</p>
              </CardBody>
              <CardBody>
                <h2>Reviews</h2>
                
              </CardBody>
            </Card>
        </div>
      </div>
    ) }
    </>
  );
}