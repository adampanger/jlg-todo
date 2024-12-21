import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TodoItem } from '../models/todo';

export const selectTodos = createFeatureSelector<TodoItem[]>('todos');

export const selectSortedTodos = createSelector(selectTodos, (todos) =>
  todos
    .slice()
    .sort(
      (a, b) => Number(a.isCompleted) - Number(b.isCompleted) || a.id - b.id
    )
);

export const selectCompletedTodos = createSelector(selectSortedTodos, (todos) =>
  todos.filter((todo) => todo.isCompleted)
);

export const selectPendingTodos = createSelector(selectSortedTodos, (todos) =>
  todos.filter((todo) => !todo.isCompleted)
);
