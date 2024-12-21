import { createAction, props } from '@ngrx/store';
import { TodoItem } from '../models/todo';

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ todo: TodoItem }>()
);

export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: number }>()
);

export const toggleTodoCompletion = createAction(
  '[Todo] Toggle Todo Completion',
  props<{ todo: TodoItem }>()
);

export const loadTodos = createAction('[Todo] Load Todos');

export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: TodoItem[] }>()
);

export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: any }>()
);
