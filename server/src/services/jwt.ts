import jwt from 'jsonwebtoken'
import { config } from '../config/config';


export const generateToken = (payload: any) => {
    return jwt.sign(payload, config?.secrets?.jwtSecret, {
        algorithm: "HS256",
        expiresIn: 60 * 60 * 24,
    });
};


export const verifyToken = (token: string) => {

    try {

        const secret = config.secrets.jwtSecret;
        const decoded = jwt.verify(token, secret)
        if (decoded) {
            return decoded
        } else {
            throw new Error('Failed to verify token')
        }

    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
}

