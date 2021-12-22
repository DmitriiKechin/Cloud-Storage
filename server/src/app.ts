const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.routes');
const fileRouter = require('./routes/file.routes');
const fileUpload = require('express-fileupload');
const app = express();
const PORT: number = config.get('port') || 5000;

app.use(fileUpload({}));
app.use(express.json());
app.use(express.static('./static'));
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);

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
