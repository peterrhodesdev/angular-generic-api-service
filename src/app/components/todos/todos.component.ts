import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { TodoModel } from 'src/app/models/todo.model';
import { AtLeastIdAndOneField } from 'src/app/models/base-api-endpoint.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {

  public todos: TodoModel[];
  public isPerformingRequest: boolean;
  public activeNavItem: number;
  public selectedTodo?: TodoModel;
  public createTodoSuccessSubject: Subject<void>;

  public readonly listTodosNavItemId: number = 1;
  public readonly viewTodoNavItemId: number = 2;
  public readonly createNavItemId: number = 3;
  public readonly updateNavItemId: number = 4;

  constructor(private todoService: TodoService) {
    this.todos = [];
    this.isPerformingRequest = false;
    this.activeNavItem = this.listTodosNavItemId;
    this.selectedTodo = undefined;
    this.createTodoSuccessSubject = new Subject<void>();
  }

  /* Create new todo */

  public onCreateTodoEvent(todo: TodoModel) {
    this.isPerformingRequest = true;

    try {
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
    } catch(error) {
      alert(`Error trying to create todo: ${error}`);
    }
  }

  /* Delete todo by id */

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

  /* Get todos */

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

  /* Update existing todo */

  public onUpdateSelectedTodoEvent(id: number) {
    this.selectedTodo = this.todos.find(todo => todo.id === id);
    this.activeNavItem = this.updateNavItemId;
  }

  public onUpdateFullTodoEvent(todo: TodoModel) {
    this.isPerformingRequest = true;

    try {
      this.todoService
        .updateFull(todo)
        .subscribe(
          data => {
            this.todos.forEach(todo => {
              if (todo.id === data.id) {
                todo = data;
              }
            });
            alert(`Successfully updated todo with id = ${data.id}`);
          },
          error => {
            alert(`Error updating todo: ${error}`);
          })
        .add(() => {
          this.isPerformingRequest = false;
        });
    } catch(error) {
      alert(`Error trying to update todo: ${error}`);
    }
  }

  public onUpdatePartialTodoEvent(partialTodo: AtLeastIdAndOneField<TodoModel>) {
    this.isPerformingRequest = true;

    try {
      this.todoService
        .updatePartial(partialTodo)
        .subscribe(
          data => {
            this.todos.forEach(todo => {
              if (todo.id === data.id) {
                todo = data;
              }
            });
            alert(`Successfully updated todo with id = ${data.id}`);
          },
          error => {
            alert(`Error updating todo: ${error}`);
          })
        .add(() => {
          this.isPerformingRequest = false;
        });
    } catch(error) {
      alert(`Error trying to update todo: ${error}`);
    }
  }

  /* View todo */

  public onViewSelectedTodoEvent(id: number) {
    this.selectedTodo = this.todos.find(todo => todo.id === id);
    this.activeNavItem = this.viewTodoNavItemId;
  }

  public onViewTodoEvent(id: number) {
    this.isPerformingRequest = true;
    this.selectedTodo = undefined;

    this.todoService
      .getOne(id)
      .subscribe(
        data => {
          this.selectedTodo = data;
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
