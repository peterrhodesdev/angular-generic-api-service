import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TodoModel } from 'src/app/models/todo.model';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {

  public todo: TodoModel;
  private createTodoSuccessSubscription?: Subscription;
  @Input() createTodoSuccessEvent?: Observable<void>;
  @Input() public isLoading: boolean;

  constructor() {
    this.todo = new TodoModel();
    this.isLoading = false;
  }

  ngOnInit(): void {
    if (this.createTodoSuccessEvent) {
      this.createTodoSuccessSubscription = this.createTodoSuccessEvent.subscribe(() => this.onCreateTodoSuccessEvent());
    }
  }

  ngOnDestroy(): void {
    if (this.createTodoSuccessSubscription) {
      this.createTodoSuccessSubscription.unsubscribe();
    }
  }

  public onCreateTodoSuccessEvent() {
    this.todo = new TodoModel();
  }

  @Output() createTodoEmitter = new EventEmitter<TodoModel>();
  public onSubmitTodoEvent() {
    this.createTodoEmitter.emit(this.todo);
  }
}
