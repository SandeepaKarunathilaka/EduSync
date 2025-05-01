import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

// Middleware to verify any authenticated user
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, 'You are not authenticated!'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(errorHandler(403, 'Invalid or expired token.'));
        }

        req.user = decoded;
        next();
    });
};

// Middleware to verify admin user
export const verifyAdmin = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, 'You are not authenticated!'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(errorHandler(403, 'Invalid or expired token.'));
        }

        if (!decoded.isAdmin) {
            return next(errorHandler(403, 'Admin access required!'));
        }

        req.user = decoded;
        next();
    });
};