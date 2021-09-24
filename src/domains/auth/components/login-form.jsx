import * as React from "react";
import cn from "classnames";
import { Button } from "components/button";
import { TextField } from "components/text-field";
import { useLogin } from "../auth.state";
import { useFormik } from "formik";
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().min(8).max(20).required('Password is required')
});

export const LoginForm = ({...props}) => {
  const [status, setStatus] = React.useState("idle");
  const login = useLogin();
  const className = cn("max-w-md mx-auto m-6 shadow", props.className);
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      setStatus("loading");
      login({...values}).catch(() => setStatus("error"));
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
            Fail to login.
          </div>
        )}
        <div className="text-3xl mt-4 mb-8 font-extrabold text-center">
          Login
        </div>
        <div className="space-y-6">
          <TextField
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            id="email"
            autoFocus
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
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={status === "loading"}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};
