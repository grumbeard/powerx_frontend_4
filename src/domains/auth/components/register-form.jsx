import * as React from "react";
import cn from "classnames";
import { Button } from "components/button";
import { TextField } from "components/text-field";
import { useRegister } from "../auth.state";
import { useFormik } from "formik";
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().min(8).max(20).required('Password is required'),
  avatar: Yup.string().url().required('Avatar image url is required')
});

export const RegisterForm = ({...props}) => {
  const [status, setStatus] = React.useState("idle");
  const register = useRegister();
  const className = cn("max-w-md mx-auto m-6 shadow", props.className);
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      avatar: ''
    },
    validationSchema,
    onSubmit: (values) => {
      setStatus("loading");
      register({ ...values }).catch(() => setStatus("error"));
      formik.resetForm();
    }
  });

  return (
    <div className={className}>
      <form
        onSubmit={formik.handleSubmit}
        className="p-6"
      >
        {status === "error" && (
          <div className="p-2 text-red-800 bg-red-200 rounded-sm">
            Fail to register.
          </div>
        )}
        <div className="text-3xl mt-4 mb-8 font-extrabold text-center">
          Register
        </div>
        <div className="space-y-6">
          <TextField
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            id="name"
            autoFocus
            required
            disabled={status === "loading"}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="block text-xs text-red-500">
              {formik.errors.name}
            </div>
          )}
          <TextField
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            id="email"
            required
            disabled={status === "loading"}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="block text-xs text-red-500">
              {formik.errors.email}
            </div>
          )}
          <TextField
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            id="password"
            type="password"
            required
            disabled={status === "loading"}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="block text-xs text-red-500">
              {formik.errors.password}
            </div>
          )}
          <TextField
            label="Avatar"
            value={formik.values.avatar}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="avatar"
            id="avatar"
            type="text"
            required
            disabled={status === "loading"}
          />
          {formik.touched.avatar && formik.errors.avatar && (
            <div className="block text-xs text-red-500">
              {formik.errors.avatar}
            </div>
          )}
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={status === "loading"}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};
