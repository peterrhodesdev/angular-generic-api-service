import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { TodoModel } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {

  public todos: TodoModel[];
  public isPerformingRequest: boolean;
  public activeNavItem: number;
  public viewTodo?: TodoModel;
  public createTodoSuccessSubject: Subject<void>;

  public readonly listTodosNavItemId: number = 1;
  public readonly viewTodoNavItemId: number = 2;
  public readonly createNavItemId: number = 3;
  public readonly editExistingNavItemId: number = 4;

  constructor(private todoService: TodoService) {
    this.todos = [];
    this.isPerformingRequest = false;
    this.activeNavItem = this.listTodosNavItemId;
    this.viewTodo = undefined;
    this.createTodoSuccessSubject = new Subject<void>();
  }

  /* Create */

  public onCreateTodoEvent(todo: TodoModel) {
    this.isPerformingRequest = true;

    this.todoService
      .create(todo)
      .subscribe(
        data => {
          this.todos.push(data);
          this.createTodoSuccessSubject.next();
          alert(`Successfully created todo with id = ${data.id}`);
        },
        error => {
          alert(`Error creating todo: ${error}`);
        })
      .add(() => {
        this.isPerformingRequest = false;
      });
  }

  /* Delete */

  public onDeleteTodoEvent(id: number) {
    this.isPerformingRequest = true;

    this.todoService
      .delete(id)
      .subscribe(
        data => {
          this.todos = this.todos.filter(todo => todo.id !== id);
          alert(`Successfully deleted todo with id = ${id}`);
        },
        error => {
          alert(`Error deleting todo with id = ${id}: ${error}`);
        })
      .add(() => {
        this.isPerformingRequest = false;
      });
  }

  /* Edit */

  public onEditTodoEvent(id: number) {
    this.activeNavItem = this.editExistingNavItemId;
    // TODO
  }

  /* Get all */

  public onGetAllEvent(): void {
    this.isPerformingRequest = true;
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
        this.isPerformingRequest = false;
      });
  }

  /* Get filtered */

  public onGetFilteredEvent(userId: number) {
    this.isPerformingRequest = true;
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
        this.isPerformingRequest = false;
      });
  }

  /* View */

  public onViewTodoEvent(id: number) {
    this.isPerformingRequest = true;
    this.viewTodo = undefined;
    this.activeNavItem = this.viewTodoNavItemId;

    this.todoService
      .getOne(id)
      .subscribe(
        data => {
          this.viewTodo = data;
        },
        error => {
          alert(`Error getting todo with id ${id}: ${error}`);
        })
      .add(() => {
        this.isPerformingRequest = false;
      });
    //
  }
}
