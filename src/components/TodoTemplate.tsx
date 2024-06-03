import React from 'react';
import { User } from '../model/user';

interface OwnProps {
  children: React.ReactNode;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

function TodoTemplate({ children, setUser }: OwnProps) {
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setUser(null);
  };

  return (
    <>
      <div className='logout-div'>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
      <div className='template-css'>{children}</div>
    </>
  );
}

export default TodoTemplate;
