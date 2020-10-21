import { randomBytes } from 'crypto';
import { diskStorage, Options } from 'multer';
import { resolve } from 'path';

import { NotFoundError } from '../utils/NotFoundError';

export const multerConfig = {
  dest: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file, cb) => {
      randomBytes(16, (error, hash) => {
        if (error) {
          cb(error, file.filename);
        }
        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
  limits: {
    fieldSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      throw new NotFoundError('Inválid file type.');
    }
  },
} as Options;
