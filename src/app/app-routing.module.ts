import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'src/app/components/home/home.component';
import { HttpStatusCodesComponent } from 'src/app/components/http-status-codes/http-status-codes.component';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { TodosComponent } from 'src/app/components/todos/todos.component';
import { UsersComponent } from 'src/app/components/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect empty url to 'home'
  { path: 'home', component: HomeComponent },
  { path: 'http-status-codes', component: HttpStatusCodesComponent },
  { path: 'todos', component: TodosComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', component: NotFoundComponent } // Wildcard route for a 404 not found, must be last element in the list
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
