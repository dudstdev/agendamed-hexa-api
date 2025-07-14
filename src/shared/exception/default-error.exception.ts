export enum ExceptionTypes {
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
}

export interface Exception {
  type: ExceptionTypes;
  code: string;
  statusCode?: number;
  message: string;
  data?: unknown;
}

export class DefaultErrorException extends Error implements Exception {
  type: ExceptionTypes;
  code: string;
  statusCode?: number;
  data?: unknown;

  constructor(exception: Exception) {
    super(exception.message);
    this.code = exception.code;
    this.statusCode = exception.statusCode;
    this.type = exception.type;
    this.data = exception.data;
    this.message = exception.message;
  }
}
