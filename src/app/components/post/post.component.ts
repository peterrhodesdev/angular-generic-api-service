import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PostModel } from 'src/app/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public posts: PostModel[];
  public isLoading: boolean;
  public userIdFilter: number;

  constructor(private postService: PostService) {
    this.posts = [];
    this.isLoading = false;
    this.userIdFilter = 1;
  }

  ngOnInit(): void {
    //this.getAllPosts();
  }

  public onGetAllClick() {
    this.getAllPosts();
  }

  private getAllPosts(): void {
    this.isLoading = true;
    this.posts = [];

    this.postService
    .getMany()
    .subscribe(
      data => {
        this.posts = [...data];
      },
      error => {
        alert("Error getting posts");
      })
    .add(() => {
      this.isLoading = false;
    });
  }

  public onGetFilteredClick() {
    this.getPostsForUser(this.userIdFilter);
  }

  private getPostsForUser(userId: number) {
    this.isLoading = true;
    this.posts = [];

    this.postService
    .getManyFilterByUserId(userId)
    .subscribe(
      data => {
        this.posts = [...data];
      },
      error => {
        alert(`Error getting posts for user ${userId}`);
      })
    .add(() => {
      this.isLoading = false;
    });
  }
}
