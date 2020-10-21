import fs from 'fs';
import { resolve } from 'path';
import sharp from 'sharp';

export async function resize(path: string, photo: string) {
  sharp(resolve(__dirname, '..', '..', 'tmp', 'uploads', `${path}`))
    .resize({ width: 1000, height: 1000 })
    .webp({ quality: 80 })
    .toFile(
      resolve(__dirname, '..', '..', 'tmp', 'output', `${photo}`),
      (err) => {
        if (err) {
          console.log(err);
        } else {
          fs.unlink(
            resolve(__dirname, '..', '..', 'tmp', 'uploads', `${path}`),
            (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log(path, ' apagado');
              }
            }
          );
          return true;
        }
      }
    );
}
