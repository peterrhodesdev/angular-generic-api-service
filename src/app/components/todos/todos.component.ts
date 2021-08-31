import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { TodoModel } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {

  public todos: TodoModel[];
  public isLoading: boolean;
  public activeNavItem: number;

  constructor(private todoService: TodoService) {
    this.todos = [];
    this.isLoading = false;
    this.activeNavItem = 1;
  }

  /* Delete */

  public onDeleteTodoEvent(id: number) {
    /*this.isLoading = true;

    this.todoService
      .delete(id)
      .subscribe(
        data => {
          this.todos = this.todos.filter(todo => todo.id !== id);
          alert(`Successfully deleted todo with id = ${id}`);
        },
        error => {
          alert(`Error deleting todo with id = ${id}`);
        })
      .add(() => {
        this.isLoading = false;
      });*/
  }

  /* Edit */

  public onEditTodoEvent(id: number) {
    this.activeNavItem = 4;
  }

  /* Get all */

  public onGetAllEvent(): void {
    this.isLoading = true;
    this.todos = [];

    this.todoService
      .getMany()
      .subscribe(
        data => {
          this.todos = [...data];
        },
        error => {
          alert(`Error getting todos: ${error}`);
        })
      .add(() => {
        this.isLoading = false;
      });
  }

  /* Get filtered */

  public onGetFilteredEvent(userId: number) {
    this.isLoading = true;
    this.todos = [];

    this.todoService
      .getManyFilterByUserId(userId)
      .subscribe(
        data => {
          this.todos = [...data];
        },
        error => {
          alert(`Error getting todos for user ${userId}: ${error}`);
        })
      .add(() => {
        this.isLoading = false;
      });
  }

  /* View */

  public onViewTodoEvent(id: number) {
    this.activeNavItem = 2;
    //
  }
}
