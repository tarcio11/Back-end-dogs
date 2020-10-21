export class NegocioError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor(message: string) {
    this.name = 'NegocioError';
    this.message = message;
  }
}
