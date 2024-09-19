import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../services/jwt';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    try {

        const userToken = req?.cookies?.userToken;

        if (userToken) {
            const user: any = verifyToken(userToken);
            req.user = user
            next();
        } else {
            throw new Error("Please login and try again");
        }

    } catch (error) {

        res.status(401).json({ status: 'error', message: 'User not authorized' })
    }
}