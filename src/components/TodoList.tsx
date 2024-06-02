import React from 'react';

interface OwnProps {
  children: React.ReactNode;
}

function TodoList({ children }: OwnProps) {
  return <div className='todo-list'>{children}</div>;
}

export default TodoList;
