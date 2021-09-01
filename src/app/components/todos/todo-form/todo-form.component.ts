import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoModel } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {

  public todo: TodoModel;
  @Input() public isLoading: boolean;
  @Input() public allowIdInput: boolean;
  @Input() public submitButtonText: string;

  constructor() {
    this.todo = new TodoModel();
    this.isLoading = false;
    this.allowIdInput = false;
    this.submitButtonText = 'Submit';
  }

  @Output() submitTodoEmitter = new EventEmitter<TodoModel>();
  public onSubmitTodoClick() {
    this.submitTodoEmitter.emit(this.todo);
  }
}
