import { Component, OnInit } from '@angular/core';
import { UsersApiEndpointService } from 'src/app/services/users-api-endpoint.service';
import { UserModel } from 'src/app/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: UserModel[];
  public isPerformingRequest: boolean;
  public selectedUser?: UserModel;

  constructor(private usersApiEndpointService: UsersApiEndpointService, private modal: NgbModal) {
    this.users = [];
    this.isPerformingRequest = false;
    this.selectedUser = undefined;
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  private getAllUsers(): void {
    this.isPerformingRequest = true;

    this.usersApiEndpointService
      .getMany()
      .subscribe(
        data => {
          this.users = [...data];
          this.selectedUser = this.users[0];
        },
        error => {
          ModalComponent.open(this.modal, 'Get all users', ['Error getting users.', error]);
        })
      .add(() => {
        this.isPerformingRequest = false;
      });
  }

  public onViewUserClick(id: number) {
    this.selectedUser = this.users.find(user => user.id! === id);
  }
}
