import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: UserModel[];
  public isPerformingRequest: boolean;
  public selectedUser?: UserModel;

  constructor(private userService: UserService) {
    this.users = [];
    this.isPerformingRequest = false;
    this.selectedUser = undefined;
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  private getAllUsers(): void {
    this.isPerformingRequest = true;

    this.userService
      .getMany()
      .subscribe(
        data => {
          this.users = [...data];
        },
        error => {
          alert(`Error getting users: ${error}`);
        })
      .add(() => {
        this.isPerformingRequest = false;
      });
  }

  public onViewUserClick(id: number) {
    this.selectedUser = this.users.find(user => user.id! === id);
  }
}
