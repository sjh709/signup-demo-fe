import React, { useState, useEffect } from 'react';
import TodoTemplate from '../components/TodoTemplate';
import TodoHeader from '../components/TodoHeader';
import { Task } from '../model/task';
import api from '../utils/api';
import TodoList from '../components/TodoList';
import TodoItem from '../components/TodoItem';
import { User } from '../model/user';

function TodoPage({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) {
  const [todoList, setTodoList] = useState<[] | Task[]>([]);
  const [todoValue, setTodoValue] = useState<string>('');

  const getTasks = async () => {
    const response = await api.get('/tasks');
    setTodoList(response.data.data);
  };

  const addTask = async () => {
    try {
      const response = await api.post('/tasks', {
        task: todoValue,
        isComplete: false,
      });
      if (response.status === 200) {
        setTodoValue('');
        getTasks();
      } else {
        throw new Error('task can not be added');
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  const toggleComplete = async (id: string) => {
    try {
      const task = todoList.find((item) => item._id === id);
      const response = await api.put(`/tasks/${id}`, {
        isComplete: !task?.isComplete,
      });
      if (response.status === 200) {
        getTasks();
      } else {
        throw new Error('task can not be added');
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTasks();
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className='display-center'>
      <TodoTemplate setUser={setUser}>
        <TodoHeader
          todoValue={todoValue}
          setTodoValue={setTodoValue}
          addTask={addTask}
        />
        <TodoList>
          {todoList.length > 0 ? (
            todoList.map((item, index) => (
              <TodoItem
                item={item}
                key={index}
                toggleComplete={toggleComplete}
                deleteItem={deleteItem}
              />
            ))
          ) : (
            <h2>등록된 할일이 없습니다.</h2>
          )}
        </TodoList>
      </TodoTemplate>
    </div>
  );
}

export default TodoPage;
