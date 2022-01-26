import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import authRouter from './routes/auth.routes';
import fileRouter from './routes/file.routes';
import shareRouter from './routes/share.routes';

const fileUpload = require('express-fileupload');

const app = express();
const PORT: number = config.get('port') || 5000;

app.use(fileUpload());
app.use(express.json());
app.use(express.static('./static'));
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);
app.use('/api/share', shareRouter);

async function start(): Promise<void> {
  try {
    await mongoose.connect(config.get('mongoUrl'));
    app.listen(PORT, () =>
      console.log(`App has been started on port --> ${PORT}...`)
    );
  } catch (e: any) {
    console.log('server Error', e.messsage);
    process.exit(1);
  }
}

start();
