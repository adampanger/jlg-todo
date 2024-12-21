import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTodo } from '../todo.actions';
import { TodoItem } from '../../models/todo';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent {
  newTodoTitle: string = '';

  constructor(private store: Store) {}

  addTodo() {
    const trimmedTitle = this.newTodoTitle.trim();
    if (trimmedTitle) {
      const newTodo: TodoItem = {
        id: 0,
        title: trimmedTitle,
        isCompleted: false,
      };
      this.store.dispatch(addTodo({ todo: newTodo }));
      this.newTodoTitle = '';
    }
  }
}
