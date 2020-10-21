import Knex from '../database/connection';
import { Usuario } from '../entities/Usuario';
import { UsuarioRepository } from '../repositories/UsuarioRepository';

export class UsuarioService {
  async create(usuario: Usuario): Promise<number | any> {
    return Knex.transaction(async (trx) => {
      const usuarioRepository = new UsuarioRepository(trx);
      const id: number = await usuarioRepository.create(usuario);
      return id;
    }).catch((err) => {
      console.log(err);
      throw err;
    });
  }
  async findOne(id: number): Promise<any> {
    return Knex.transaction(async (trx) => {
      const usuarioRepository = new UsuarioRepository(trx);
      const user = await usuarioRepository.findOne(id);
      return user;
    }).catch((err) => {
      console.log(err);
      throw err;
    });
  }
  async updateOne(id: number, key: string, token: string): Promise<any> {
    return Knex.transaction(async (trx) => {
      const usuarioRepository = new UsuarioRepository(trx);
      const result = await usuarioRepository.updateOne(id, key, token);
      return result;
    }).catch((err) => {
      console.log(err);
      throw err;
    });
  }
}
