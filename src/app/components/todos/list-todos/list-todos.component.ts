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
  // Pagination variables
  public paginationPage: number;
  public paginationPageSize: number;
  public todosPage: TodoModel[];

  @Input()
  get todos(): TodoModel[] { return this._todos; }
  set todos(todos: TodoModel[]) {
    this._todos = todos;
    this.paginationPage = 1;
    this.onPageChange();
  }
  private _todos: TodoModel[] = [];

  constructor() {
    this.isLoading = false
    this.userIdFilter = 1;
    this.paginationPage = 1;
    this.paginationPageSize = 10;
    this.todosPage = [];
  }

  @Output() deletedTodoWithId = new EventEmitter<number>();
  public onDeleteTodoClick(id: number) {
    this.deletedTodoWithId.emit(id);
  }

  @Output() updateSelectedTodoWithId = new EventEmitter<number>();
  public onUpdateTodoClick(id: number) {
    this.updateSelectedTodoWithId.emit(id);
  }

  @Output() getAll = new EventEmitter<number>();
  public onGetAllClick() {
    this.getAll.emit();
  }

  @Output() getFilteredWithUserId = new EventEmitter<number>();
  public onGetFilteredClick() {
    this.getFilteredWithUserId.emit(this.userIdFilter);
  }

  @Output() viewSelectedTodoWithId = new EventEmitter<number>();
  public onViewTodoClick(id: number) {
    this.viewSelectedTodoWithId.emit(id);
  }

  /* pagination */

  public onPageChange(): void {
    let startIndex = (this.paginationPage - 1) * this.paginationPageSize;
    let endIndex = startIndex + this.paginationPageSize;
    this.todosPage = this.todos.slice(startIndex, endIndex);
  }
}
