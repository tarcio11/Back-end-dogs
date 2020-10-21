export class ConverterEntity {
  static byObjectToEntity(textRow: Object, objectConverter: object): object {
    const atributes = Reflect.ownKeys(textRow);

    atributes.forEach((atribute) => {
      if (Reflect.has(objectConverter, atribute))
        Reflect.set(objectConverter, atribute, Reflect.get(textRow, atribute));
    });

    return objectConverter;
  }
}
