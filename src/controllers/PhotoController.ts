import { Request, Response } from 'express';

import connection from '../database/connection';
import { PhotoRepository } from '../repositories/PhotoRepository';
import { PostService } from '../service/PostService';
import { PhotoProps } from './PostController';

const postService = new PostService();

export class PhotoController {
  async index(request: Request, response: Response) {
    const { _total, _page, _user } = request.query;
    const selected_total = Number(_total);
    const selected_page = Number(_page);
    if (_user) {
      const posts = await postService.getPost(
        _user,
        selected_page,
        selected_total
      );

      const data = posts.map((post: PhotoProps) => {
        return {
          id: post.post_id,
          author: post.username,
          title: post.name,
          image_url: `http://localhost:3000/files/${post.key}`,
          peso: post.weight,
          idade: post.age,
          access: post.access,
        };
      });

      return response.json(data);
    }

    const photo = await new PhotoRepository(connection);
    const photos = await photo.findAll(selected_page, selected_total);

    const serializedPhotos = photos.map((item: any) => {
      return {
        ...item,
        image_url: `http://localhost:3000/files/${item.key}`,
      };
    });

    return response.json(serializedPhotos);
  }
}
