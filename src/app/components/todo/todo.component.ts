import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { title } from 'process';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {

  todoForm!: FormGroup;
  todos: Todo[] = [];
  isEditMode = false;
  editTodoId!: number;

  constructor(private fb: FormBuilder, private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.loadTodos();
    console.log('Current Todo List>>', this.todos);

  }

  loadTodos() {
    this.todos = this.todoService.getTodos();
    console.log('Latest Todo List>>', this.todos);
  }

  onSubmit() {
    if (this.todoForm.invalid) return;

    const { title, description } = this.todoForm.value;

    if (this.isEditMode) {
      const updatedTodo: Todo = {
        id: this.editTodoId,
        title,
        description,
        isCompleted: false,
      };
      this.todoService.updateTodos(updatedTodo);
      this.isEditMode = false;
    }
    else {
      const newTodo: Todo = {
        id: Date.now(),
        title,
        description,
        isCompleted: false,
      };
      this.todoService.addTodos(newTodo);
      console.log('Recent added todo>>', newTodo);
    }

    this.todoForm.reset();
    this.loadTodos();
  }



  onEdit(todo: Todo) {
    this.isEditMode = true;
    this.editTodoId = todo.id;
    this.todoForm.setValue({
      title: todo.title,
      description: todo.description
    });
  }


  onDelete(id: number) {
    this.todoService.deleteTodo(id);
    this.loadTodos();
    console.log('onDelete todo id>>', id);
  }


  toggleComplete(todo: Todo) {
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateTodos(todo);
    this.loadTodos();
  }

  cancleEdit() {
    this.isEditMode = false;
    this.todoForm.reset();
  }

}



