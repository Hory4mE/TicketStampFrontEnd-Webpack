// ProtectedRoute.tsx
import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';

const ProtectedRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
