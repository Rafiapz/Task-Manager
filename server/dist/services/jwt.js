"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const generateToken = (payload) => {
    var _a;
    return jsonwebtoken_1.default.sign(payload, (_a = config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.secrets) === null || _a === void 0 ? void 0 : _a.jwtSecret, {
        algorithm: "HS256",
        expiresIn: 60 * 60 * 24,
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const secret = config_1.config.secrets.jwtSecret;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (decoded) {
            return decoded;
        }
        else {
            throw new Error('Failed to verify token');
        }
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
exports.verifyToken = verifyToken;
