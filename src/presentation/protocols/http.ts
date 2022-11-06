export interface HttpRequest {
  body?: any;
  queryParams?: any;
}

export interface HttpResponse {
  statusCode: number;
  body: any;
}
