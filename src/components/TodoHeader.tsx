import React, { SetStateAction, Dispatch } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface OwnProps {
  todoValue: '' | string;
  setTodoValue: Dispatch<SetStateAction<string>>;
  addTask(): void;
}

function TodoHeader({ todoValue, setTodoValue, addTask }: OwnProps) {
  return (
    <div className='todo-block'>
      <h1>Todo List</h1>
      <div className='input-wrap'>
        <input
          type='text'
          placeholder='할일을 입력하세요.'
          className='input-box'
          value={todoValue}
          onChange={(event) => setTodoValue(event.target.value)}
        />
        <button className='add-btn' onClick={addTask}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className='header-line' />
    </div>
  );
}

export default TodoHeader;
