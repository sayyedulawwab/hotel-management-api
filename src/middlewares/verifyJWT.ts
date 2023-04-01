import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request interface

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const JWT_SECRET: any = process.env.JWT_SECRET;
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json('You are not authenticated!');

  try {
    const user = jwt.verify(token, JWT_SECRET) as { userId: string };

    req.userId = user.userId;

    next();
  } catch (err) {
    res.status(403).json('Token is not valid!');
  }
};

export default verifyJWT;
