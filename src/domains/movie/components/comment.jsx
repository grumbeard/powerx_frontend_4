import * as React from 'react';
import { Card, CardHeading, CardBody } from 'components/card';
import { StarIcon, XCircleIcon } from '@heroicons/react/solid'
import { IconButton } from 'components/icon-button';

const DeleteButton = ({className, onClick}) => {
  return(
    <IconButton className={className} onClick={onClick}>
      <XCircleIcon className="h-5 w-5 text-red-500" />
    </IconButton>
  );
}

export const Comment = ({ comment, editable }) => {
  const { content, rating, userName, createdAt, updatedAt } = comment;
  const stars = Array(parseInt(rating)).fill(<StarIcon className="w-5 h-5" />);
  const dateString = createdAt === updatedAt ? createdAt : updatedAt;
  const dateTime = new Date(dateString).toLocaleString();
  
  return (
    <Card>
      <CardHeading className="flex justify-between relative">
        <span className="flex">{stars}</span>
        <span>{userName}</span>
        {editable && <DeleteButton className="absolute top-0 right-0 text-xs" />}
      </CardHeading>
      <CardBody>
        <div>{content}</div>
        <div className="text-right text-xs">
          {createdAt === updatedAt
            ? dateTime
            : `Edited: ${dateTime}`
          }
        </div>
      </CardBody>
    </Card>
  );
}