import connection from '../database/connection';
import { Photo } from '../entities/Photo';
import { Post } from '../entities/Post';
import { PhotoRepository } from '../repositories/PhotoRepository';
import { PostRepository } from '../repositories/PostRepository';

export class PostService {
  async create(post: Post, photo: Photo): Promise<number | any> {
    return connection
      .transaction(async (trx) => {
        const postRepository = new PostRepository(trx);
        const post_id = await postRepository.create(post);

        photo.setPost_id(post_id);

        const photoRepository = new PhotoRepository(trx);
        await photoRepository.create(photo);

        return post_id;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async delete(id: number): Promise<boolean | number> {
    return connection.transaction(async (trx) => {
      const postRepository = new PostRepository(trx);
      await postRepository.delete(id);

      const photoRepository = new PhotoRepository(trx);
      await photoRepository.delete(id);

      return true;
    });
  }

  async findOne(id: number): Promise<any> {
    return connection.transaction(async (trx) => {
      const postRepository = new PostRepository(trx);
      const post = await postRepository.findOne(id);

      return post;
    });
  }

  async getPost(id: any, page: number, limit: number): Promise<any> {
    return connection.transaction(async (trx) => {
      const postRepository = new PostRepository(trx);
      const post = await postRepository.getPost(id, page, limit);
      return post;
    });
  }

  async getStats(id: any): Promise<any> {
    return connection.transaction(async (trx) => {
      const postRepository = new PostRepository(trx);
      const post = await postRepository.findStats(id);
      return post;
    });
  }

  async update(id: number, item: string, num: number): Promise<number> {
    return connection.transaction(async (trx) => {
      const postRepository = new PostRepository(trx);
      const post = await postRepository.update(id, item, num);
      return post;
    });
  }
}
