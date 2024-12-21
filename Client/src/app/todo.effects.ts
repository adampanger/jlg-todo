import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TodoService } from './todo.service';
import {
  loadTodos,
  addTodo,
  deleteTodo,
  toggleTodoCompletion,
  loadTodosSuccess,
  loadTodosFailure,
} from './todo.actions';

@Injectable()
export class TodoEffects extends class {
  constructor(protected readonly actions$: Actions) {}
} {
  constructor(actions$: Actions, private todoApiService: TodoService) {
    super(actions$);
  }

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      mergeMap(() =>
        this.todoApiService.getTodos().pipe(
          map((todos) => loadTodosSuccess({ todos })),
          catchError((error) => of(loadTodosFailure({ error })))
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      mergeMap(({ todo }) =>
        this.todoApiService.createTodo(todo).pipe(
          map(loadTodos),
          catchError((error) => of(loadTodosFailure({ error })))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodo),
      mergeMap(({ id }) =>
        this.todoApiService.deleteTodo(id).pipe(
          map(loadTodos),
          catchError((error) => of(loadTodosFailure({ error })))
        )
      )
    )
  );

  toggleCompletion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleTodoCompletion),
      mergeMap(({ todo }) =>
        this.todoApiService.updateTodo(todo).pipe(
          map(loadTodos),
          catchError((error) => of(loadTodosFailure({ error })))
        )
      )
    )
  );

  // Additional effects can be added for updating todos, etc.
}
