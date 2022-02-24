export class DatabaseError extends Error {
  code: number;
  status: string;

  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
    this.message = message;
    this.code = 500;
    this.status = 'INTERNAL_SERVER_ERROR';
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
    this.name = 'UserFacingError';
  }
}

export class UserNotFoundError extends UserFacingError {
  code: number;
  status: string;

  constructor(message: string) {
    super(message);
    this.name = 'UserNotFoundError';
    this.message = message;
    this.code = 404;
    this.status = 'NOT_FOUND';
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
    this.name = 'UserNotAuthorizedError';
    this.message = message;
    this.code = 401;
    this.status = 'UNAUTHORIZED';
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
