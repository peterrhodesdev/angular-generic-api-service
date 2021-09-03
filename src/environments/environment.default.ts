export interface IEnvironment {
  production: boolean;
  API_BASE_URL_JSON_PLACEHOLDER: string;
  API_ENDPOINT_JSON_PLACEHOLDER_TODOS: string;
  API_ENDPOINT_JSON_PLACEHOLDER_USERS: string;
}

export const defaultEnvironment = {
  API_BASE_URL_JSON_PLACEHOLDER: 'https://jsonplaceholder.typicode.com/',
  API_ENDPOINT_JSON_PLACEHOLDER_TODOS: 'todos/',
  API_ENDPOINT_JSON_PLACEHOLDER_USERS: 'users/',
};
