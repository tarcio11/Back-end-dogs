import { Post } from '../entities/Post';
import { BaseRepository } from './base/BaseRepository';

export class PostRepository extends BaseRepository<Post> {
  getNameTable(): string {
    return 'posts';
  }
}
