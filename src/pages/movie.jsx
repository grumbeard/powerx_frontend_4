import * as React from 'react';
import { useParams } from "react-router-dom";
import { useMovie } from 'domains/movie/hooks/use-movies';
import { useComments } from 'domains/movie/hooks/use-comments';
import { Card, CardHeading, CardBody } from 'components/card';
import { Badge } from 'components/badge';
import { Comment } from 'domains/movie/components/comment';
import { CommentForm } from 'domains/movie/components/comment-form';
import { useAuth } from 'domains/auth/auth.state';

function extractYear(dateString) {
  const regex = /1|2\d{3}/;
  return dateString.match(regex);
}

export const Movie = () => {
  const { movieId } = useParams();
  const { data: movie, status: movieStatus } = useMovie(movieId);
  const { data: comments, status: commentsStatus } = useComments(movieId);
  const { status, uid } = useAuth();
  
  return(
    <>
    {movieStatus !== 'success' && (<div className='text-center'><h1>Loading...</h1></div>)}
    { movie && (
      <div style={{backgroundImage: `url(${movie.backdropUrl})`}} className="min-h-screen bg-gradient-to-br bg-cover flex justify-center">
        <div className="backdrop-filter backdrop-blur-sm h-screen lg:w-3/4 w-4/5 flex p-10 gap-10">
            <Card className="w-1/2 h-full">
              <img src={movie.posterUrl} alt="movie poster" />
            </Card>
            <Card className="w-1/2 p-10 bg-white h-full overflow-y-scroll">
              <CardHeading className="relative">
                {movie.adult
                  ? <Badge color="red" className="absolute right-4 bottom-7">Adult</Badge>
                  : <Badge color="green" className="absolute right-4 bottom-7">Child-Friendly</Badge>
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
                <h2 className="mb-1">Reviews</h2>
                {commentsStatus !== 'success' && (<div className='text-center'><h1>Loading comments...</h1></div>)}
                { comments &&  comments.map(comment =>
                  <Comment key={comment._id} comment={comment} editable={comment.userId === uid} />
                )}
                {(status === 'authenticated') && <CommentForm movieId={movieId} />}
              </CardBody>
            </Card>
        </div>
      </div>
    ) }
    </>
  );
}