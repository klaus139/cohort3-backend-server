import jwt from 'jsonwebtoken';
import Auth from '../models/authModels.js';
import dotenv from 'dotenv';
dotenv.config();

const authenticate = async (req, res, next) => {
  try {
    let token = req.cookies?.jwt;

    if (token) {
      const secret = process.env.JWT_SECRET || 'fallbackSecret';
      const decoded = jwt.verify(token, secret);
      
      req.user = await Auth.findById(decoded.userId).select('-password');
      next();
    } else {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export { authenticate };
