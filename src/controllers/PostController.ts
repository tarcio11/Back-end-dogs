import { Request, Response } from 'express';
import fs from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';

import { resize } from '../config/SharpConfig';
import { AuthController } from '../controllers/AuthController';
import connection from '../database/connection';
import { Photo } from '../entities/Photo';
import { Post } from '../entities/Post';
import { CommentRepository } from '../repositories/CommentRepository';
import { PhotoRepository } from '../repositories/PhotoRepository';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { PostService } from '../service/PostService';
import { NegocioError } from '../utils/NegocioError';
import { Validation } from '../utils/Validation';
import { User } from './userController';

const postService = new PostService();
const validation = new Validation();

export interface PhotoProps {
  post_id: number;
  username: string;
  name: string;
  key: string;
  weight: number;
  age: number;
  access: number;
}

export class PostController {
  async index(request: Request, response: Response) {
    const { id } = request.params;
    const selectedID = Number(id);

    const post = new Post();
    const postAccess = post.setAccess(post.getAccess() + 1);
    await postService.update(selectedID, 'access', postAccess);

    const photo = await new PhotoRepository(connection);
    const photoSelected = await photo.getPhoto(selectedID);

    const comment = await new CommentRepository(connection);
    const comments = await comment.find(selectedID);

    const data = photoSelected.map((item: PhotoProps) => {
      return {
        id: item.post_id,
        author: item.username,
        title: item.name,
        src: `http://localhost:3000/files/${item.key}`,
        peso: item.weight,
        idade: item.age,
        acessos: item.access,
        total_comments: comments.length,
        comments: comments,
      };
    });

    return response.json(data);
  }

  async create(request: Request, response: Response) {
    const { name, weight, age } = request.body;
    const { originalname: nameImg, size, filename: key } = request.file;
    const user = AuthController.getUsuarioIdBy(request);

    try {
      validation.validate(name, weight, age, nameImg, size, key);

      const usuarioRepository = new UsuarioRepository(connection);
      const usuario = await usuarioRepository.validateUser(user);

      const post = new Post();
      post.setName(name);
      post.setWeight(weight);
      post.setAge(age);
      post.setUser_id(usuario.getId());
      post.setUser_username(usuario.getUsername());

      const photo = new Photo();
      photo.setNameImg(nameImg);
      photo.setSize(size);
      photo.setKey(key);

      const id = await postService.create(post, photo);

      if (id) {
        await resize(photo.getKey(), photo.getKey());
      }

      return response.json({ id });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const SelectedID = Number(id);
    const user = AuthController.getUsuarioIdBy(request);

    try {
      const post = await postService.findOne(SelectedID);
      const photo = await new PhotoRepository(connection);
      const usuarioRepository = await new UsuarioRepository(connection);
      const usuario = await usuarioRepository.validateUser(user);
      const photoSelected = await photo.validatePhoto(post.id);

      if (post.user_id !== usuario.getId()) {
        return response.json(new NegocioError('Você não tem permissão'));
      }

      await postService.delete(SelectedID);
      promisify(fs.unlink)(
        resolve(__dirname, '..', '..', 'tmp', 'output', photoSelected.getKey())
      );

      return response.json({ Status: 'Deletado' });
    } catch (error) {
      return response.status(401).json({ error: 'Id não existe' });
    }
  }
}
