import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private storagekey = 'todos';
  constructor() { }

  getTodos(): Todo[]{
    if (typeof window !== 'undefined' && window.localStorage) {
    const data = localStorage.getItem(this.storagekey);
    return data ? JSON.parse(data) : [];
    }
    return [];
  }

  saveTodos(todos: Todo[]):void{
    localStorage.setItem(this.storagekey, JSON.stringify(todos));
  } 

  addTodos(todo: Todo): void{
    const todos = this.getTodos();
    todos.push(todo);
    this.saveTodos(todos);
  } 

  updateTodos(updatedTodo: Todo):void{
    let todos = this.getTodos();
    todos = todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo));
    this.saveTodos(todos);
    console.log('updatedTodo', updatedTodo);
  } 

  deleteTodo(id: number): void{
    const todos= this.getTodos().filter(todo => todo.id !== id);
    this.saveTodos(todos);
  } 

}
