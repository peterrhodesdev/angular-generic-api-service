import { Component, OnInit } from '@angular/core';
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from 'http-status-codes';

@Component({
  selector: 'app-http-status-codes',
  templateUrl: './http-status-codes.component.html',
  styleUrls: ['./http-status-codes.component.scss']
})
export class HttpStatusCodesComponent implements OnInit {

  public httpStatusCodes: number[];
  public selectedHttpStatusCode: number;

  constructor() {
    this.httpStatusCodes = Object.values(StatusCodes)
      .filter(value => typeof value === 'number')
      .map(value => value as number)
      .sort((n1,n2) => n1 - n2);
    this.selectedHttpStatusCode = this.httpStatusCodes[0];
    console.log(this.httpStatusCodes)
  }

  ngOnInit(): void {
  }

  public getStatusCodeDescription(statusCode: number): string {
    return statusCode + ': ' + getReasonPhrase(statusCode);
  }

  public changeSelectedHttpStatusCode(statusCode: number) {
    this.selectedHttpStatusCode = statusCode;
  }
}
