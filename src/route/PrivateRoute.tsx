import React from 'react';
import { Navigate } from 'react-router-dom';
import { User } from '../model/user';

interface OwnProps {
  user: User | null;
  children: JSX.Element;
}

function PrivateRoute({ user, children }: OwnProps) {
  return user ? children : <Navigate to='login' />;
}

export default PrivateRoute;
