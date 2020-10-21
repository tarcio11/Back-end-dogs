import { Request, Response } from 'express';

import { AuthController } from '../controllers/AuthController';
import connection from '../database/connection';
import { Comment } from '../entities/Comment';
import { CommentRepository } from '../repositories/CommentRepository';
import { PhotoRepository } from '../repositories/PhotoRepository';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { NotFoundError } from '../utils/NotFoundError';
import { Validation } from '../utils/Validation';
import { User } from './userController';

const validation = new Validation();

interface CommentProps {
  comment: string;
}

export class CommentController {
  async index(request: Request, response: Response) {
    const { id } = request.params;
    const selectedID = Number(id);

    try {
      const photo = await new PhotoRepository(connection);
      const photoSelected = await photo.validatePhoto(selectedID);

      const comment = await new CommentRepository(connection);
      const comments = await comment.find(photoSelected.getId());

      return response.json(comments.length);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async create(request: Request, response: Response) {
    const { id } = request.params;
    const SelectedID = Number(id);

    const commentPost: CommentProps = request.body;
    const user = AuthController.getUsuarioIdBy(request);

    validation.validate(commentPost.comment);
    try {
      const photo = await new PhotoRepository(connection);
      const photoSelected = await photo.validatePhoto(SelectedID);

      const usuarioRepository = new UsuarioRepository(connection);
      const usuario = await usuarioRepository.validateUser(user);

      if (!photoSelected) throw new NotFoundError('Foto não encontrada!');

      const comment = new Comment();
      comment.setUser_id(usuario.getId());
      comment.setComment(commentPost.comment);
      comment.setPhoto_id(photoSelected.getId());

      const selectedComment = await new CommentRepository(connection);
      const commentID = await selectedComment.create(comment);

      return response.json({
        id: commentID,
        comment_post_ID: photoSelected.getId(),
        username: usuario.getUsername(),
        comment: comment.getComment(),
        user_id: usuario.getId(),
      });
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
