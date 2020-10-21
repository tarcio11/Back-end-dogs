import bcrypt from 'bcrypt-nodejs';

export class AuthService {
  static encryptPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
