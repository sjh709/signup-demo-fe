import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../model/task';

interface OwnProps {
  item: Task;
  toggleComplete(id: string): void;
  deleteItem(id: string): void;
}

function TodoItem({ item, toggleComplete, deleteItem }: OwnProps) {
  console.log('it', item);
  return (
    <div className='item-block'>
      <div className='check-circle' onClick={() => toggleComplete(item._id)}>
        {item.isComplete && <FontAwesomeIcon icon={faCheck} />}
      </div>
      <div className='item-text'>{item.task}</div>
      <div>{item.author?.name}</div>
      <div className='item-remove'>
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteItem(item._id)} />
      </div>
    </div>
  );
}

export default TodoItem;
