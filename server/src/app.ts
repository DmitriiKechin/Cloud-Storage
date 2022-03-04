import express from 'express';
//import config from 'config';
import mongoose from 'mongoose';
import authRouter from './routes/auth.routes';
import fileRouter from './routes/file.routes';
import shareRouter from './routes/share.routes';
import dotenv from 'dotenv';
import path from 'path';
import proxy from 'express-http-proxy';

dotenv.config();

const fileUpload = require('express-fileupload');

const app = express();
const PORT: string | number = process.env.PORT || 5000;

app.use(fileUpload());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);
app.use('/api/share', shareRouter);

app.use(
  '/api/proxy',
  proxy('https://downloader.disk.yandex.ru', {
    parseReqBody: false,
    https: true,
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../../client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../../client', 'build', 'index.html')
    );
  });
}

async function start(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URL || '');

    app.listen(PORT, () =>
      console.log(`App has been started on port --> ${PORT}...`)
    );
  } catch (e: any) {
    console.log('server Error :-(', e.messsage);
    process.exit(1);
  }
}

start();
