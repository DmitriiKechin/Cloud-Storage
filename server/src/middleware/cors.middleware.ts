import express from 'express';

const cors = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');
  next();
};

export default cors;
