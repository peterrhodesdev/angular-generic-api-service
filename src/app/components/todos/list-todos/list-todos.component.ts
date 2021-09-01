import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoModel } from 'src/app/models/todo.model';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.scss']
})
export class ListTodosComponent {
  
  @Input() public isLoading: boolean;
  public userIdFilter: number;

  @Input()
  get todos(): TodoModel[] { return this._todos; }
  set todos(todos: TodoModel[]) {
    this._todos = todos;
  }
  private _todos: TodoModel[] = [];

  constructor() {
    this.isLoading = false
    this.userIdFilter = 1;
  }

  @Output() deletedTodoWithId = new EventEmitter<number>();
  public onDeleteTodoClick(id: number) {
    this.deletedTodoWithId.emit(id);
  }

  @Output() selectedUpdateTodoWithId = new EventEmitter<number>();
  public onUpdateTodoClick(id: number) {
    this.selectedUpdateTodoWithId.emit(id);
  }

  @Output() getAll = new EventEmitter<number>();
  public onGetAllClick() {
    this.getAll.emit();
  }

  @Output() getFilteredWithUserId = new EventEmitter<number>();
  public onGetFilteredClick() {
    this.getFilteredWithUserId.emit(this.userIdFilter);
  }

  @Output() viewTodoWithId = new EventEmitter<number>();
  public onViewTodoClick(id: number) {
    this.viewTodoWithId.emit(id);
  }
}
