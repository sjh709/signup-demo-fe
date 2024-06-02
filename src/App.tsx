import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './route/PrivateRoute';

function App() {
  const [user, setUser] = useState<string | null>(null);
  const getUser = async () => {
    try {
      const token = sessionStorage.getItem('token');
    } catch (err) {}
  };
  return (
    <Routes>
      <Route
        path='/'
        element={
          <PrivateRoute user={user}>
            <TodoPage />
          </PrivateRoute>
        }
      />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  );
}

export default App;
