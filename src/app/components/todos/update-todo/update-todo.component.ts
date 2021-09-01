import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoModel } from 'src/app/models/todo.model';
import { ValidationHelper } from 'src/app/helpers/validation.helper';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.scss']
})
export class UpdateTodoComponent {

  @Input() public todo: TodoModel;
  @Input() public isLoading: boolean;

  constructor() {
    this.todo = new TodoModel();
    this.isLoading = false;
  }

  @Output() updateFullTodoEmitter = new EventEmitter<TodoModel>();
  public onSubmitTodoEvent() {
    this.updateFullTodoEmitter.emit(this.todo);
  }
}
