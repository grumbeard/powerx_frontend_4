import * as React from 'react';
import { Card, CardFooter, CardBody } from 'components/card';
import { PropTypes } from 'prop-types';

function shortenText(maxChar, text) {
  if (text.length > maxChar)
    return text.substring(0, maxChar - 3).concat('...');
  return text;
}

export const MovieCard = (props) => {
  const {title, posterUrl} = props.movie;
  
  return (
    <Card className="bg-blue-50">
      <CardBody>
        <img src={posterUrl} alt="movie poster" />
      </CardBody>
      <CardFooter>
        <h3>{shortenText(45,title)}</h3>
      </CardFooter>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    posterUrl: PropTypes.string
  })
}