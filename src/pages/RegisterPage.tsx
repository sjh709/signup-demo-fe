import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secPassword, setSecPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handelSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (password !== secPassword) {
        throw new Error('패스워드가 일치하지 않습니다. 다시 입력해주세요.');
      }
      const response = await api.post('/user', { name, email, password });
      if (response.status === 200) {
        navigate('/login');
      } else {
        throw new Error(response.data.error);
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  };

  return (
    <div className='display-center'>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form className='login-box' onSubmit={handelSubmit}>
        <h1>회원가입</h1>
        <Form.Group className='mb-3' controlId='formName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='string'
            placeholder='Name'
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
              setName(event.target.value)
            }
          />
        </Form.Group>

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

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control
            type='password'
            placeholder='re-enter the password'
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
              setSecPassword(event.target.value)
            }
          />
        </Form.Group>

        <Button variant='info' type='submit'>
          회원가입
        </Button>
      </Form>
    </div>
  );
}

export default RegisterPage;
