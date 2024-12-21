import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoItem } from '../../models/todo';
import { deleteTodo, loadTodos, toggleTodoCompletion } from '../todo.actions';
import { selectSortedTodos } from '../todo.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  imports: [CommonModule],
})
export class TodoListComponent implements OnInit {
  todos$: Observable<TodoItem[]>;

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectSortedTodos);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
  }

  toggleCompletion(todo: TodoItem, isCompleted: boolean) {
    this.store.dispatch(
      toggleTodoCompletion({
        todo: { ...todo, isCompleted },
      })
    );
  }

  deleteTodo(id: number) {
    this.store.dispatch(deleteTodo({ id }));
  }
}
