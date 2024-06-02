import React from 'react';
import { Navigate } from 'react-router-dom';

interface OwnProps {
  user: string | null;
  children: JSX.Element;
}

function PrivateRoute({ user, children }: OwnProps) {
  return user ? children : <Navigate to='login' />;
}

export default PrivateRoute;
