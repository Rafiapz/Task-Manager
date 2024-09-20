"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const environment_1 = require("./environment");
exports.config = {
    http: {
        port: (0, environment_1.envNumber)('PORT', 3500)
    },
    mongo: {
        database: (0, environment_1.envString)('DB_NAME', 'taskManager'),
        username: (0, environment_1.envString)('MONGO_USERNAME', 'mongo_username'),
        password: (0, environment_1.envString)('MONGO_PASSWORD', 'mongo_password')
    },
    secrets: {
        jwtSecret: (0, environment_1.envString)('JWT_SECRET', 'jwt_secret')
    }
};
