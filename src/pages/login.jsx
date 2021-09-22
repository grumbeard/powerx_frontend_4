import * as React from "react";
import { Link, Redirect } from 'react-router-dom';
import { LoginForm } from "domains/auth/components/login-form";
import { useAuth } from 'domains/auth/auth.state';

export const LoginPage = () => {
  const { status } = useAuth();
  
  if (status === 'authenticated') {
    return <Redirect to="/" />
  }
  else {
    return (
      <div className="flex flex-col items-center">
        <LoginForm className="w-full" />
        <div>
          <Link to="/register">Register account</Link>
        </div>
      </div>
    );
  }
};
