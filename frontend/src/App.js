import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Recados from './components/Recados';
import Notificacao from './components/Notificacao';
import GoogleCalendar from './components/GoogleCalendar';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Notificacao />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/recados"
          element={
            <PrivateRoute>
              <Recados />
              <GoogleCalendar />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
