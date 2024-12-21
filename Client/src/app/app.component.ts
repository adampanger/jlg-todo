import { Component } from '@angular/core';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [TodoFormComponent, TodoListComponent],
})
export class AppComponent {
  title = 'TODO App';
}
