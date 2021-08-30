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

  constructor(private postService: PostService) {
    this.posts = [];
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.getPosts();
  }

  private getPosts(): void {
    this.isLoading = true;

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
}
