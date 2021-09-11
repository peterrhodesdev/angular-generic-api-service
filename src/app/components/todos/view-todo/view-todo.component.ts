import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoModel } from 'src/app/models/todo.model';

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.scss']
})
export class ViewTodoComponent {

  @Input() public todo?: TodoModel;
  @Input() public isLoading: boolean;
  public viewTodoId: number;

  constructor() {
    this.todo = undefined;
    this.isLoading = false;
    this.viewTodoId = 1;
  }

  public canViewTodo(): boolean {
    return !(this.todo === null || typeof this.todo === "undefined");
  }

  @Output() viewTodoWithId = new EventEmitter<number>();
  public onViewTodoClick() {
    this.viewTodoWithId.emit(this.viewTodoId);
  }
}
