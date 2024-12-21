import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TodoFormComponent } from './todo-form.component';
import { addTodo } from '../todo.actions';
import { By } from '@angular/platform-browser';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoFormComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not dispatch action when title is empty', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    const btn = fixture.nativeElement.querySelector('button');
    expect(btn).toBeTruthy();
    btn.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });

  it('should not dispatch action when title is whitespace', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.newTodoTitle = '   ';

    const btn = fixture.nativeElement.querySelector('button');
    expect(btn).toBeTruthy();
    btn.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });

  it('should dispatch addTodo on button click when title is set', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const title = 'Test Todo';
    component.newTodoTitle = title;

    const btn = fixture.nativeElement.querySelector('button');
    expect(btn).toBeTruthy();
    btn.click();

    expect(dispatchSpy).toHaveBeenCalledOnceWith(
      addTodo({ todo: { id: 0, isCompleted: false, title } })
    );
  });

  it('should update todoTitle property when input value changes (view-to-model)', () => {
    const title = 'Test Todo';
    const inputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;

    inputElement.value = title;
    inputElement.dispatchEvent(new Event('input'));

    expect(component.newTodoTitle).toBe(title);
  });
});
