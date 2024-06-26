import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { User } from '../model/user';

function LoginPage({
  user,
  setUser,
}: {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const response = await api.post('/user/login', {
        email,
        password,
      });
      if (response.status === 200) {
        setUser(response.data.user);
        sessionStorage.setItem('token', response.data.token);
        api.defaults.headers['authorization'] = 'Bearer ' + response.data.token;
        setError('');
        navigate('/');
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  };

  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <div className='display-center'>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form className='login-box' onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
              setEmail(event.target.value)
            }
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
              setPassword(event.target.value)
            }
          />
        </Form.Group>

        <div className='button-box'>
          <Button variant='info' type='submit'>
            로그인
          </Button>
          <span>
            계정이 없다면? <Link to='/register'>회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
}

export default LoginPage;
