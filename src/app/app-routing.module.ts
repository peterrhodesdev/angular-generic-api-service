import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommentComponent } from 'src/app/components/comment/comment.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { PostComponent } from 'src/app/components/post/post.component';
import { UserComponent } from 'src/app/components/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect empty url to 'home'
  { path: 'comment', component: CommentComponent },
  { path: 'home', component: HomeComponent },
  { path: 'post', component: PostComponent },
  { path: 'user', component: UserComponent },
  { path: '**', component: NotFoundComponent } // Wildcard route for a 404 not found, must be last element in the list
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
