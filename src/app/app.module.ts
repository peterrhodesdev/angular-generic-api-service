import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { TodosComponent } from './components/todos/todos.component';
import { UsersComponent } from './components/users/users.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ListTodosComponent } from './components/todos/list-todos/list-todos.component';
import { ViewTodoComponent } from './components/todos/view-todo/view-todo.component';
import { CreateTodoComponent } from './components/todos/create-todo/create-todo.component';
import { UpdateTodoComponent } from './components/todos/update-todo/update-todo.component';
import { TodoFormComponent } from './components/todos/todo-form/todo-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NavigationBarComponent,
    UsersComponent,
    TodosComponent,
    LoadingSpinnerComponent,
    ListTodosComponent,
    ViewTodoComponent,
    CreateTodoComponent,
    UpdateTodoComponent,
    TodoFormComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
