import { createReducer, on } from '@ngrx/store';
import {
  addTodo,
  deleteTodo,
  toggleTodoCompletion,
  loadTodosSuccess,
  loadTodosFailure,
} from './todo.actions';
import { TodoItem } from '../models/todo';

export const initialState: TodoItem[] = [];

export const todoReducer = createReducer(
  initialState,
  on(loadTodosSuccess, (_, { todos }) => [...todos]),
  on(loadTodosFailure, (state, { error }) => {
    console.error('Failed to load todos:', error);
    return state;
  }),
  on(addTodo, (state, { todo }) => [...state, todo]),
  on(deleteTodo, (state, { id }) => state.filter((todo) => todo.id !== id)),
  on(toggleTodoCompletion, (state, { todo }) =>
    state.map((existingTodo) =>
      existingTodo.id === todo.id
        ? { ...existingTodo, isCompleted: todo.isCompleted }
        : todo
    )
  )
);
