import { compareSync } from 'bcrypt-nodejs';

import { Usuario } from '../entities/Usuario';
import { ConverterEntity } from '../utils/ConverterEntity';
import { NegocioError } from '../utils/NegocioError';
import { NotFoundError } from '../utils/NotFoundError';
import { BaseRepository } from './base/BaseRepository';

export class UsuarioRepository extends BaseRepository<Usuario> {
  getNameTable(): string {
    return 'users';
  }

  async validatePassword(credencial: string, pass: string): Promise<Usuario> {
    const usuario = await this._collection
      .where({ email: credencial })
      .orWhere({ username: credencial })
      .first();

    if (!usuario) throw new NotFoundError('Usuário não foi encontrado');

    const isMatch = compareSync(pass, usuario.password);
    if (!isMatch) throw new NegocioError('Email ou senha incorreta');

    return ConverterEntity.byObjectToEntity(usuario, new Usuario()) as Usuario;
  }

  async validateUser(credencial: string): Promise<Usuario> {
    const usuario = await this._collection
      .where({ email: credencial })
      .orWhere({ username: credencial })
      .first();

    if (!usuario) throw new NotFoundError('Usuário não foi encontrado');

    return ConverterEntity.byObjectToEntity(usuario, new Usuario()) as Usuario;
  }
}
