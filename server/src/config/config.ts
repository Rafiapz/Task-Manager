import { envNumber, envString } from "./environment";

export const config = {
    http: {

        port: envNumber('PORT', 3500)
    },
    mongo: {
        database: envString('DB_NAME', 'taskManager'),
        username: envString('MONGO_USERNAME', 'mongo_username'),
        password: envString('MONGO_PASSWORD', 'mongo_password')
    },
    secrets: {
        jwtSecret: envString('JWT_SECRET', 'jwt_secret')
    }
}