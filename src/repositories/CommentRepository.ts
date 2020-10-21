import { Comment } from '../entities/Comment';
import { BaseRepository } from './base/BaseRepository';

export class CommentRepository extends BaseRepository<Comment> {
  getNameTable(): string {
    return 'comments';
  }
}
