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

  constructor(private postService: PostService) {
    this.posts = [];
  }

  ngOnInit(): void {
    this.getPosts();
  }

  private getPosts(): void {
    this.postService
    .getMany()
    .subscribe(
      data => {
        console.log("Posts = ", data);
        this.posts = [...data];
      },
      error => {
        alert("Error getting posts");
      });
  }
}
