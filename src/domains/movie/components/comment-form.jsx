import * as React from 'react';
import { Button } from "components/button";
import { TextareaField } from 'components/textarea-field';
import { SelectField } from 'components/select-field';
import { useCommentMutation } from '../hooks/use-comments';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { PropTypes } from 'prop-types';

const validationSchema = Yup.object({
  rating: Yup.string().oneOf(['1','2','3','4','5']).required('Rating Required'),
  content: Yup.string().required('Comments Required'),
});

export const CommentForm = ({movieId, ...props}) => {
  const { mutate } = useCommentMutation('create');
  const [status, setStatus] = React.useState('idle');
  const ratingInputRef = React.useRef();
  
  const formik = useFormik({
    initialValues: {
      rating: '1',
      content: ''
    },
    validationSchema,
    onSubmit: (values) => {
      setStatus("loading");
      mutate(
        { ...values, rating: Number(values.rating), movieId },
        {
          onSuccess: () => {
            formik.resetForm();
            setStatus("idle");
            if (ratingInputRef.current) {
              ratingInputRef.current.focus();
            }
          },
          onError: () => setStatus("error")
        }
      );
    }
  });
  
  return (
    <form
      {...props}
      onSubmit={formik.handleSubmit}
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
          value={formik.values.rating}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="rating"
          id="rating"
          required
          disabled={status === "loading"}
          ref={ratingInputRef}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </SelectField>
        {formik.touched.rating && formik.errors.rating && (
          <div className="block text-xs text-red-500">
            {formik.errors.rating}
          </div>
        )}
        <TextareaField
          label="Comment"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="content"
          id="content"
          required
          disabled={status === "loading"}
        />
        {formik.touched.content && formik.errors.content && (
          <div className="block text-xs text-red-500">
            {formik.errors.content}
          </div>
        )}
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
  );
}

CommentForm.propTypes = {
  movieId: PropTypes.string.isRequired
}