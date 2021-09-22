import * as React from "react";
import { Link, Redirect } from 'react-router-dom';
import { RegisterForm } from "domains/auth/components/register-form";
import { useAuth } from 'domains/auth/auth.state';

export const RegisterPage = () => {
  const { status } = useAuth();
  
  if (status === 'authenticated') {
    return <Redirect to="/" />
  }
  else {
    return (
      <div className="flex flex-col items-center">
        <RegisterForm className="w-full" />
        <div>
          <Link to="/login">Login to existing account</Link>
        </div>
      </div>
    );
  }
};