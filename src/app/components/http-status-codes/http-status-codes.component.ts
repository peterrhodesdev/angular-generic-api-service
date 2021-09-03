import { Component, OnInit } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-http-status-codes',
  templateUrl: './http-status-codes.component.html',
  styleUrls: ['./http-status-codes.component.scss']
})
export class HttpStatusCodesComponent implements OnInit {

  public httpStatusCodes: HttpStatusCode[];

  constructor() {
    this.httpStatusCodes = [];//Object.values(HttpStatusCode);
  }

  ngOnInit(): void {
  }

}
