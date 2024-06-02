import React from 'react';

interface OwnProps {
  children: React.ReactNode;
}

function TodoTemplate({ children }: OwnProps) {
  return <div className='template-css'>{children}</div>;
}

export default TodoTemplate;
