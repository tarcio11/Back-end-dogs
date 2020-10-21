import Knex, { QueryBuilder, Transaction } from 'knex';

import { IRead } from '../interfaces/IRead';
import { IWrite } from '../interfaces/IWrite';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public readonly _collection: QueryBuilder;

  constructor(db: Transaction | Knex) {
    this._collection = db(this.getNameTable());
  }

  abstract getNameTable(): string;

  async create(item: T): Promise<number> {
    const [id]: number[] = await this._collection.insert(item);
    return id;
  }

  async update(id: number, item: string, num: number): Promise<number> {
    const result = Number(
      await this._collection.where('id', '=', id).increment(item, num)
    );

    console.log('result: ', result);
    return result;
  }

  async updateOne(id: number, key: string, token: string): Promise<boolean> {
    const result = Boolean(
      await this._collection.where('id', '=', id).update(`${key}`, token)
    );
    return result;
  }

  async delete(id: number): Promise<boolean> {
    const result: boolean = await this._collection.where('id', id).del();
    return result;
  }

  async find(id: number): Promise<T[]> {
    const result: T[] = await this._collection
      .join('users', 'users.id', '=', 'comments.user_id')
      .where('photo_id', id)
      .select(['comments.*', 'users.username']);
    return result;
  }

  async findStats(id: number): Promise<T[]> {
    const result: T[] = await this._collection
      .join('users', 'users.id', '=', 'posts.user_id')
      .where('user_id', id)
      .select('posts.*');
    return result;
  }

  async findAll(page: number, limit: number): Promise<T[]> {
    const result: T[] = await this._collection
      .join('posts', 'posts.id', '=', 'photos.post_id')
      .join('users', 'users.id', '=', 'posts.user_id')
      .limit(limit)
      .offset((page - 1) * limit)
      .select(['posts.*', 'photos.*', 'users.username']);
    return result;
  }

  async getPhoto(id: number): Promise<any> {
    const result: T = await this._collection
      .join('posts', 'posts.id', '=', 'photos.post_id')
      .join('users', 'users.id', '=', 'posts.user_id')
      .where('post_id', id)
      .select('*');
    return result;
  }
  async getPost(id: any, page: number, limit: number): Promise<any> {
    const result: T = await this._collection
      .join('users', 'users.id', '=', 'posts.user_id')
      .join('photos', 'photos.post_id', '=', 'posts.id')
      .limit(limit)
      .offset((page - 1) * limit)
      .where('user_id', id)
      .orWhere('username', id)
      .select('*');
    return result;
  }

  async findOne(id: number): Promise<T> {
    const result: T = await this._collection.where('id', id).first();
    return result;
  }
}
