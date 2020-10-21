import { Request, Response } from 'express';
import { encode } from 'jwt-simple';

import connection from '../database/connection';
import { Usuario } from '../entities/Usuario';
import { main } from '../modules/Mailer';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { AuthService } from '../service/AuthService';
import { UsuarioService } from '../service/UsuarioService';
import { DateUtil } from '../utils/DateUtil';
import { NegocioError } from '../utils/NegocioError';
import { NotFoundError } from '../utils/NotFoundError';
import { Validation } from '../utils/Validation';
import { AuthController } from './AuthController';

const usuarioRepository = new UsuarioRepository(connection);
const usuarioService = new UsuarioService();
const validation = new Validation();

const jwtSecret = process.env.APP_SECRET;
const date = new DateUtil();

export interface User {
  id: number;
  nome: string;
}

export class UserController {
  async store(request: Request, response: Response) {
    const { username, email, password } = request.body;

    const passwordCrypted = AuthService.encryptPassword(password);

    try {
      validation.validate(username, email, password);

      const selectedUser = await connection('users')
        .where(function () {
          this.where('username', username).orWhere('email', email);
        })
        .first();

      if (selectedUser) throw new NegocioError('Email já cadastrado');

      const usuario = new Usuario();
      usuario.setUsername(username);
      usuario.setEmail(email);
      usuario.setPassword(passwordCrypted);

      const id = await usuarioService.create(usuario);

      return response.status(201).json({ id });
    } catch (error) {
      return response.status(400).send(error);
    }
  }

  async forgotPassowrd(request: Request, response: Response) {
    const { email } = request.body;

    try {
      const repository = new UsuarioRepository(connection);
      const usuario = await repository.validateUser(email);

      const payload = {
        nome: usuario.getUsername(),
        id: usuario.getId(),
        iat: date.now(),
        exp: date.tokenExp(),
      };

      const token = await encode({ ...payload }, String(jwtSecret));

      await usuarioRepository.updateOne(
        payload.id,
        'passwordResetToken',
        token
      );

      await main(email, token);

      return response.json({ ...payload, token });
    } catch (error) {
      console.log(error);
      return response.json({ error: 'error no reste password' });
    }
  }

  async resetPassowrd(request: Request, response: Response) {
    const { password } = request.body;

    const passwordCrypted = AuthService.encryptPassword(password);

    try {
      const user = AuthController.getUsuarioIdBy(request);

      const repository = new UsuarioRepository(connection);
      const usuario = await repository.validateUser(user);

      if (!usuario)
        return response.status(400).json(new NotFoundError('User not found'));

      await usuarioRepository.updateOne(
        usuario.getId(),
        'password',
        passwordCrypted
      );

      return response.json({ Status: 'ok' });
    } catch (error) {
      return response.status(400).json({ error: `${error}` });
    }
  }

  async findByToken(request: Request, response: Response) {
    try {
      const user = AuthController.getUsuarioIdBy(request);

      const repository = new UsuarioRepository(connection);
      const usuario = await repository.validateUser(user);

      return response.json(usuario);
    } catch (error) {
      return response.json(error);
    }
  }
}
