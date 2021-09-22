import * as React from 'react';
import { Card, CardHeading, CardBody } from 'components/card';

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
        <img src={posterUrl} alt={`${title} poster`} />
      </CardBody>
      <CardHeading>
        {shortenText(45,title)}
      </CardHeading>
    </Card>
  );
}