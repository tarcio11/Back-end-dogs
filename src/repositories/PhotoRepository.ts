import { Photo } from '../entities/Photo';
import { ConverterEntity } from '../utils/ConverterEntity';
import { NotFoundError } from '../utils/NotFoundError';
import { BaseRepository } from './base/BaseRepository';

export class PhotoRepository extends BaseRepository<Photo> {
  getNameTable(): string {
    return 'photos';
  }

  async validatePhoto(id: number): Promise<Photo> {
    const photo = await this._collection.where({ id: id }).first();

    if (!photo) throw new NotFoundError('Foto não foi encontrada');

    return ConverterEntity.byObjectToEntity(photo, new Photo()) as Photo;
  }
}
