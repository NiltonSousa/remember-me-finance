// export interface HttpRequest<T> {
//   body: T;
//   // queryParams: NodeJS.Dict<string | string[]>;
//   pathParams: NodeJS.Dict<string | string[]>;
//   headers: NodeJS.Dict<string | string[]>;
// }

// export interface HttpResponse<T> {
//   body: T;
//   status: number;
//   headers: NodeJS.Dict<string | string[]>;
// }

export interface HttpRequest {
  body?: any;
}

export interface HttpResponse {
  statusCode: number;
  body: any;
}
