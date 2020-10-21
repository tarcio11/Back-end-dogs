import './config/env';

import cors from 'cors';
import express from 'express';
import { resolve } from 'path';

import routes from './routes/router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static(resolve(__dirname, '..', 'tmp', 'output')));

const port = parseInt(process.env.PORT as string) || 3000;
app.listen(port, () => {
  console.log('\x1b[33m%s\x1b[0m', `=> 🚀 Server running on the port: ${port}`);
});
