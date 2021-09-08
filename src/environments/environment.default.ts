import { HttpStatusCode } from '@angular/common/http';

export interface IEnvironment {
  production: boolean;
  // API
  API_BASE_URL_JSON_PLACEHOLDER: string;
  API_ENDPOINT_JSON_PLACEHOLDER_TODOS: string;
  API_ENDPOINT_JSON_PLACEHOLDER_USERS: string;
  // HTTP error
  HTTP_ERROR_RETRY_ATTEMPTS: number;
  HTTP_ERROR_RETRY_STATUS_CODES: number[];
  HTTP_ERROR_RETRY_INITIAL_INTERVAL_MILLISECONDS: number;
  HTTP_ERROR_RETRY_EXPONENTIAL_DELAY_BASE: number;
}

export const defaultEnvironment = {
  // API
  API_BASE_URL_JSON_PLACEHOLDER: 'https://jsonplaceholder.typicode.com/',
  API_ENDPOINT_JSON_PLACEHOLDER_TODOS: 'todos/',
  API_ENDPOINT_JSON_PLACEHOLDER_USERS: 'users/',
  // HTTP error
  HTTP_ERROR_RETRY_ATTEMPTS: 3,
  HTTP_ERROR_RETRY_STATUS_CODES: [ 
    HttpStatusCode.RequestTimeout, // 408
    HttpStatusCode.BadGateway, // 502
    HttpStatusCode.ServiceUnavailable, // 503
    HttpStatusCode.GatewayTimeout, // 504
  ],
  HTTP_ERROR_RETRY_INITIAL_INTERVAL_MILLISECONDS: 1000,
  HTTP_ERROR_RETRY_EXPONENTIAL_DELAY_BASE: 1.5,
};
