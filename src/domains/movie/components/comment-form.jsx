import * as React from 'react';
import { Button } from "components/button";
import { TextareaField } from 'components/textarea-field';
import { SelectField } from 'components/select-field';
import { useCommentMutation } from '../hooks/use-comments';

export const CommentForm = ({movieId}) => {
  const [rating, setRating] = React.useState(1);
  const [content, setContent] = React.useState('');
  const [status, setStatus] = React.useState('idle');
  const { mutate } = useCommentMutation('create');
  return (
    <div>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          setStatus("loading");
          mutate(
            { rating: Number(rating), content, movieId },
            {
              onSuccess: () => setStatus("idle"),
              onError: () => setStatus("error")
            }
          );
        }}
        className="p-6"
      >
        {status === "error" && (
          <div className="p-2 text-red-800 bg-red-200 rounded-sm">
            Fail to submit comment.
          </div>
        )}
        <div className="space-y-6">
          <SelectField
            label="Rating"
            value={rating}
            onChangeValue={setRating}
            name="rating"
            id="rating"
            autoFocus
            required
            disabled={status === "loading"}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </SelectField>
          <TextareaField
            label="Comment"
            value={content}
            onChangeValue={setContent}
            name="content"
            id="content"
            required
            disabled={status === "loading"}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={status === "loading"}
          >
            Review
          </Button>
        </div>
      </form>
    </div>
  );
}