import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { TodoItem } from '../models/todo';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  const mockTodos: TodoItem[] = [
    { id: 1, title: 'Learn Angular', isCompleted: false },
    { id: 2, title: 'Build a TODO app', isCompleted: false },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all todos (GET)', () => {
    service.getTodos().subscribe((todos) => {
      expect(todos.length).toBe(2);
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne(`${service.apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should create a new todo (POST)', () => {
    const newTodo: TodoItem = { id: 3, title: 'New Task', isCompleted: false };

    service.createTodo(newTodo).subscribe((todo) => {
      expect(todo).toEqual(newTodo);
    });

    const req = httpMock.expectOne(`${service.apiUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTodo);
    req.flush(newTodo);
  });

  it('should update an existing todo (PUT)', () => {
    const updatedTodo: TodoItem = {
      id: 1,
      title: 'Updated Task',
      isCompleted: true,
    };

    service.updateTodo(updatedTodo).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.apiUrl}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTodo);
    req.flush(updatedTodo);
  });

  it('should delete a todo (DELETE)', () => {
    service.deleteTodo(1).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
