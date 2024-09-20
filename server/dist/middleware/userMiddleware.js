"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../services/jwt");
const authMiddleware = (req, res, next) => {
    var _a;
    try {
        const userToken = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.userToken;
        if (userToken) {
            const user = (0, jwt_1.verifyToken)(userToken);
            req.user = user;
            next();
        }
        else {
            throw new Error("Please login and try again");
        }
    }
    catch (error) {
        res.status(401).json({ status: 'error', message: 'User not authorized' });
    }
};
exports.authMiddleware = authMiddleware;
