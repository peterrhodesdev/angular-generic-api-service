import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoModel } from 'src/app/models/todo.model';
import { AtLeastIdAndOneField } from 'src/app/models/base-api-endpoint.model';

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

  @Output() updatePartialTodoEmitter = new EventEmitter<AtLeastIdAndOneField<TodoModel>>();
  public onUpdatePartialTodoClick() {
    let partialTodo: AtLeastIdAndOneField<TodoModel> = {
      id: this.todo.id,
      title: this.todo.title,
    };
    this.updatePartialTodoEmitter.emit(partialTodo);
  }
}
