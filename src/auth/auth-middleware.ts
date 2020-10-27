import * as Express from 'express';
import jwt from 'jsonwebtoken';
import { AuthData } from '../types/AuthData';

export default (req: Express.Request, res: Express.Response, next: Express.NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.replace('Bearer ', '');
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET) as AuthData;
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  return next();
};
