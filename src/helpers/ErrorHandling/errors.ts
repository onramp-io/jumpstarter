export class DatabaseError extends Error {
  code: number;
  status: string;

  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
    this.message = message;
    this.code = 500;
    this.status = "Internal Server Error";
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      status: this.status,
      message: this.message,
    };
  }
}
export class QueryError extends Error {
  code: number;
  status: string;

  constructor(message: string) {
    super(message);
    this.name = 'QueryError';
    this.message = message;
    this.code = 500;
    this.status = 'Internal Server Error';
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      status: this.status,
      message: this.message,
    };
  }
}

export class UserFacingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserFacingError";
  }
}

export class BadRequestError extends UserFacingError {
  code: number;
  status: string;

  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
    this.message = message;
    this.code = 400;
    this.status = "Bad Request";
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      status: this.status,
      message: this.message,
    };
  }
}

export class NotFoundError extends UserFacingError {
  code: number;
  status: string;

  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.message = message;
    this.code = 404;
    this.status = "Not Found";
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      status: this.status,
      message: this.message,
    };
  }
}

export class AuthorizationError extends UserFacingError {
  code: number;
  status: string;

  constructor(message: string) {
    super(message);
    this.name = "UserNotAuthorizedError";
    this.message = message;
    this.code = 401;
    this.status = "Unauthorized";
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      status: this.status,
      message: this.message,
    };
  }
}

export class MethodNotAllowedError extends UserFacingError {
  code: number;
  status: string;

  constructor(message: string) {
    super(message);
    this.name = "MethodNotAllowedError";
    this.message = message;
    this.code = 405;
    this.status = "Method Not Allowed";
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      status: this.status,
      message: this.message,
    };
  }
}
