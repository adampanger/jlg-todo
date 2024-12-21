import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TodoListComponent } from './todo-list.component';
import { TodoItem } from '../../models/todo';
import { selectSortedTodos } from '../todo.selectors';
import { deleteTodo, loadTodos, toggleTodoCompletion } from '../todo.actions';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore;

  const mockTodos: TodoItem[] = [
    { id: 1, title: 'Test Todo 1', isCompleted: false },
    { id: 2, title: 'Test Todo 2', isCompleted: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectSortedTodos, value: mockTodos }],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTodos action on initialization', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledOnceWith(loadTodos());
  });

  it('should display todos in the template', () => {
    fixture.detectChanges();
    const todoItems = fixture.nativeElement.querySelectorAll('li');
    expect(todoItems.length).toBe(2);
    expect(todoItems[0].textContent).toContain('Test Todo 1');
    expect(todoItems[1].textContent).toContain('Test Todo 2');
  });

  it('should dispatch updateTodo action when a checkbox is toggled', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    const checkbox = fixture.debugElement.query(
      By.css('input[type="checkbox"]')
    );
    expect(checkbox).toBeTruthy();

    checkbox.nativeElement.checked = true;
    checkbox.triggerEventHandler('change', { target: { checked: true } });

    expect(dispatchSpy).toHaveBeenCalledOnceWith(
      toggleTodoCompletion({
        todo: { id: 1, title: 'Test Todo 1', isCompleted: true },
      })
    );
  });

  it('should dispatch deleteTodo action when delete button is clicked', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    const btn = fixture.nativeElement.querySelector('button');
    expect(btn).toBeTruthy();
    btn.click();

    expect(dispatchSpy).toHaveBeenCalledOnceWith(deleteTodo({ id: 1 }));
  });
});
