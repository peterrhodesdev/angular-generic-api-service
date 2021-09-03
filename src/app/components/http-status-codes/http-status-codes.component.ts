import { Component } from '@angular/core';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-http-status-codes',
  templateUrl: './http-status-codes.component.html',
  styleUrls: ['./http-status-codes.component.scss']
})
export class HttpStatusCodesComponent {

  public httpStatusCodes: number[];
  public selectedHttpStatusCode: number;
  public requestDetails: string[][];
  private delayMilliseconds?: number;

  constructor(private apiService: ApiService) {
    this.httpStatusCodes = Object.values(StatusCodes)
      .filter(value => typeof value === 'number')
      .map(value => value as number)
      .sort((n1,n2) => n1 - n2);
    this.selectedHttpStatusCode = this.httpStatusCodes[0];
    this.requestDetails = [];
    this.delayMilliseconds = 500;
  }

  public performRequest(statusCode: number) {
    this.requestDetails = [];
    
    let url: string = this.getUrl(statusCode);
    this.addRequestDetail(['Performing request.', url]);

    this.apiService
      .getOne<any>(url)
      .subscribe(
        data => {
          this.addRequestDetail(['Received data.']);
        },
        error => {
          this.addRequestDetail(['An error was thrown.', error]);
        })
      .add(() => {
        this.addRequestDetail(['Request finished.']);
      });
  }

  public getStatusCodeDescription(statusCode: number): string {
    return statusCode + ': ' + getReasonPhrase(statusCode);
  }

  public changeSelectedHttpStatusCode(statusCode: number) {
    this.selectedHttpStatusCode = statusCode;
  }

  /* private methods */

  private getUrl(statusCode: number): string {
    let url: string = `https://httpstat.us/${statusCode}/cors`;
    if (this.delayMilliseconds) {
      url += `?sleep=${this.delayMilliseconds!}`;
    }
    return url;
  }

  private addRequestDetail(detail: string[]) {
    this.requestDetails.push([this.getCurrentDateTime(), ...detail]);
  }

  private getCurrentDateTime(): string {
    return new Date().toLocaleString();
  }
}
