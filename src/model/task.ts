import { User } from './user';

export type Task = {
  _id: string;
  task: string;
  isComplete: boolean;
  createdAt: string;
  updatedAt: string;
  author: User;
};
