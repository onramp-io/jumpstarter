export class Success {
  code: number;
  status: string;
  message: string;

  constructor(message: string) {
    this.code = 200;
    this.status = 'OK';
    this.message = message;
  }

  toJSON() {
    return {
      code: this.code,
      status: this.status,
      message: this.message,
    };
  }
}
