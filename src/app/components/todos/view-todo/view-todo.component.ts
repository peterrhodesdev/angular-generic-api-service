import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoModel } from 'src/app/models/todo.model';
import { ValidationHelper } from 'src/app/helpers/validation.helper';

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
    return !ValidationHelper.isNullOrUndefined(this.todo);
  }

  @Output() viewTodoWithId = new EventEmitter<number>();
  public onViewTodoClick() {
    this.viewTodoWithId.emit(this.viewTodoId);
  }
}
