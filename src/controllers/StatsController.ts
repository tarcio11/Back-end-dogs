import { Request, Response } from 'express';

import connection from '../database/connection';
import { PostRepository } from '../repositories/PostRepository';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { PostService } from '../service/PostService';
import { AuthController } from './AuthController';

interface PostsProps {
  id: number;
  name: string;
  access: number;
}

export class StatsController {
  async index(request: Request, response: Response) {
    const user = AuthController.getUsuarioIdBy(request);

    try {
      const repository = new UsuarioRepository(connection);
      const usuario = await repository.validateUser(user);

      if (usuario.getId() === 0) {
        throw 'Usuário não possui permissão';
      }

      const postService = new PostService();
      const posts = await postService.getStats(usuario.getId());

      if (posts) {
        return response.json(
          posts.map((post: PostsProps) => {
            return {
              id: post.id,
              title: post.name,
              access: post.access,
            };
          })
        );
      } else {
        throw 'Não existem posts';
      }
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
