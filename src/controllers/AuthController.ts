import { Request, Response } from 'express';
import { decode, encode } from 'jwt-simple';

import Knex from '../database/connection';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { DateUtil } from '../utils/DateUtil';

const jwtSecret = process.env.APP_SECRET;
const date = new DateUtil();

export class AuthController {
  async signIn(request: Request, response: Response) {
    const { credencial, password } = request.body;

    try {
      if (!credencial || !password) throw 'Informe uma senha';

      const repository = new UsuarioRepository(Knex);
      const usuario = await repository.validatePassword(credencial, password);

      const payload = {
        id: usuario.getId(),
        nome: usuario.getUsername(),
        iat: date.now(),
        exp: date.tokenExp(),
      };

      return response.json({
        ...payload,
        token: encode({ ...payload }, String(jwtSecret)),
      });
    } catch (error) {
      response.status(401).json({ error });
    }
  }

  static getUsuarioIdBy(request: Request) {
    const usuarioDecode = decode(
      String(request.headers.authorization),
      String(jwtSecret)
    );

    return usuarioDecode.nome;
  }

  async validateToken(request: Request, response: Response) {
    const token = request.headers.authorization;
    try {
      if (token) {
        const payload = decode(token, String(jwtSecret));

        if (payload && new Date(payload.exp * 1000) > new Date()) {
          return response.send();
        }
      } else {
        throw 'Token not found!';
      }
    } catch (error) {
      console.log(error);
      return response.status(401).json({ error: 'Token expired' });
    }
  }
}
