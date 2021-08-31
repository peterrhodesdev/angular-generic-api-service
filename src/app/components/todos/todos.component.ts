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
  public userIdFilter: number;

  constructor(private todoService: TodoService) {
    this.todos = [];
    this.isLoading = false;
    this.userIdFilter = 1;
  }

  public onGetAllClick() {
    this.getAllTodos();
  }

  private getAllTodos(): void {
    this.isLoading = true;
    this.todos = [];

    this.todoService
    .getMany()
    .subscribe(
      data => {
        this.todos = [...data];
      },
      error => {
        alert("Error getting todos");
      })
    .add(() => {
      this.isLoading = false;
    });
  }

  public onGetFilteredClick() {
    this.getTodosForUser(this.userIdFilter);
  }

  private getTodosForUser(userId: number) {
    this.isLoading = true;
    this.todos = [];

    this.todoService
    .getManyFilterByUserId(userId)
    .subscribe(
      data => {
        this.todos = [...data];
      },
      error => {
        alert(`Error getting todos for user ${userId}`);
      })
    .add(() => {
      this.isLoading = false;
    });
  }
}
