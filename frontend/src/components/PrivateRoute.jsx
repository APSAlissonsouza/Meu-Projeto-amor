import React from 'react';
import { Navigate } from 'react-router-dom';
import { estaLogado } from '../utils/auth';

export default function PrivateRoute({ children }) {
  return estaLogado() ? children : <Navigate to="/login" />;
}
