import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'src/app/components/home/home.component';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect empty url to 'home'
  { path: 'home', component: HomeComponent },
  { path: '**', component: NotFoundComponent } // Wildcard route for a 404 not found, must be last element in the list
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
