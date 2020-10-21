export interface IWrite<T> {
  create(item: T): Promise<number>;
  update(id: number, item: string, num: number): Promise<number>;
  updateOne(id: number, key: string, item: string): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
