import * as React from 'react';
import { Card, CardHeading, CardBody } from 'components/card';
import { StarIcon } from '@heroicons/react/solid'

export const Comment = ({ comment }) => {
  const { content, rating, userName, createdAt, updatedAt } = comment;
  const stars = Array(parseInt(rating)).fill(<StarIcon className="w-5 h-5" />);
  const dateString = createdAt === updatedAt ? createdAt : updatedAt;
  const dateTime = new Date(dateString).toLocaleString();
  
  return (
    <Card>
      <CardHeading className="flex justify-between">
        <span className="flex">{stars}</span>
        <span>{userName}</span>
      </CardHeading>
      <CardBody>
        <div>{content}</div>
        <div className="text-right">
          {createdAt === updatedAt
            ? dateTime
            : `Edited: ${dateTime}`
          }
        </div>
      </CardBody>
    </Card>
  );
}