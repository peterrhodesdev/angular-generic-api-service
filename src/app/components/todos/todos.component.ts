import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { TodosApiEndpointService } from 'src/app/services/todos-api-endpoint.service';
import { TodoModel } from 'src/app/models/todo.model';
import { AtLeastIdAndOneField } from 'src/app/models/base-api-endpoint.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';

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

  constructor(private todosApiEndpointService: TodosApiEndpointService, private modal: NgbModal) {
    this.todos = [];
    this.isPerformingRequest = false;
    this.activeNavItem = this.listTodosNavItemId;
    this.selectedTodo = undefined;
    this.createTodoSuccessSubject = new Subject<void>();
  }

  /* Create new todo */

  public onCreateTodoEvent(todo: TodoModel) {
    this.isPerformingRequest = true;
    let modalTitle: string = 'Create todo';

    try {
      this.todosApiEndpointService
        .create(todo)
        .subscribe(
          data => {
            this.todos.push(data);
            this.createTodoSuccessSubject.next();
            this.openModal(modalTitle, [`Successfully created todo with id = ${data.id}`]);
          },
          error => {
            this.openModal(modalTitle, ['Error creating todo.', error]);
          })
        .add(() => {
          this.isPerformingRequest = false;
        });
    } catch(error) {
      this.openModal(modalTitle, ['Error trying to create todo.', error]);
    }
  }

  /* Delete todo by id */

  public onDeleteTodoEvent(id: number) {
    this.isPerformingRequest = true;
    let modalTitle: string = 'Delete todo';

    this.todosApiEndpointService
      .delete(id)
      .subscribe(
        data => {
          this.todos = this.todos.filter(todo => todo.id !== id);
          this.openModal(modalTitle, [`Successfully deleted todo with id = ${id}`]);
        },
        error => {
          this.openModal(modalTitle, [`Error deleting todo with id = ${id}.`, error]);
        })
      .add(() => {
        this.isPerformingRequest = false;
      });
  }

  /* Get todos */

  public onGetAllEvent(): void {
    this.isPerformingRequest = true;
    this.todos = [];
    let modalTitle: string = "Get all todos";

    this.todosApiEndpointService
      .getMany()
      .subscribe(
        data => {
          this.todos = [...data];
        },
        error => {
          this.openModal(modalTitle, ['Error getting todos.', error]);
        })
      .add(() => {
        this.isPerformingRequest = false;
      });
  }

  public onGetFilteredEvent(userId: number) {
    this.isPerformingRequest = true;
    this.todos = [];
    let modalTitle: string = "Get filtered todos";

    this.todosApiEndpointService
      .getManyFilterByUserId(userId)
      .subscribe(
        data => {
          this.todos = [...data];
        },
        error => {
          this.openModal(modalTitle, [`Error getting todos for user ${userId}.`, error]);
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
    let modalTitle: string = "Update full todo";

    try {
      this.todosApiEndpointService
        .updateFull(todo)
        .subscribe(
          data => {
            this.todos.forEach(todo => {
              if (todo.id === data.id) {
                todo = data;
              }
            });
            this.openModal(modalTitle, [`Successfully updated todo with id = ${data.id}`]);
          },
          error => {
            this.openModal(modalTitle, ['Error updating todo.', error]);
          })
        .add(() => {
          this.isPerformingRequest = false;
        });
    } catch(error) {
      this.openModal(modalTitle, ['Error trying to update todo.', error]);
    }
  }

  public onUpdatePartialTodoEvent(partialTodo: AtLeastIdAndOneField<TodoModel>) {
    this.isPerformingRequest = true;
    let modalTitle: string = "Update partial todo";

    try {
      this.todosApiEndpointService
        .updatePartial(partialTodo)
        .subscribe(
          data => {
            this.todos.forEach(todo => {
              if (todo.id === data.id) {
                todo = data;
              }
            });
            this.openModal(modalTitle, [`Successfully updated todo with id = ${data.id}`]);
          },
          error => {
            this.openModal(modalTitle, ['Error updating todo.', error]);
          })
        .add(() => {
          this.isPerformingRequest = false;
        });
    } catch(error) {
      this.openModal(modalTitle, ['Error trying to update todo.', error]);
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
    let modalTitle: string = "View todo";

    this.todosApiEndpointService
      .getOne(id)
      .subscribe(
        data => {
          this.selectedTodo = data;
        },
        error => {
          this.openModal(modalTitle, [`Error getting todo with id ${id}.`, error]);
        })
      .add(() => {
        this.isPerformingRequest = false;
      });
    //
  }

  /* private methods */

  private openModal(title: string, bodyLines: string[]): void {
    ModalComponent.open(this.modal, title, bodyLines);
  }
}
