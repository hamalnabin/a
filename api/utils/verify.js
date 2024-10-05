import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, 'Access token is missing'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'], // Specify the allowed algorithm
      maxAge: '2h' // Set a maximum age for the token
    });

    req.user = decoded;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return next(errorHandler(401, 'Token has expired'));
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return next(errorHandler(403, 'Invalid token'));
    }
    return next(errorHandler(500, 'Internal server error'));
  }
};