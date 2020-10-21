import { NegocioError } from './NegocioError';

export class Validation {
  validate(...fields: Array<any>) {
    fields.forEach((element) => {
      if (element === '') throw new NegocioError('Dados incompletos');
    });
  }
}
