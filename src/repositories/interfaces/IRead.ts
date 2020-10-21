export interface IRead<T> {
  find(item: number): Promise<T[]>;
  findOne(id: number): Promise<T>;
}
