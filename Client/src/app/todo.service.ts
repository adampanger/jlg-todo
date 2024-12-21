import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

import { TodoItem } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }

  createTodo(todo: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.apiUrl, todo);
  }

  updateTodo(todo: TodoItem): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
