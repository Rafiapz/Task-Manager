"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.fetchUser = exports.loginWithGoogleController = exports.loginController = exports.signupController = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const jwt_1 = require("../services/jwt");
const bcrypt_1 = require("../services/bcrypt");
const signupValidation_1 = require("../validation/signupValidation");
const loginValidation_1 = require("../validation/loginValidation");
const axios_1 = __importDefault(require("axios"));
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { value, error } = signupValidation_1.signupValidation.validate(req === null || req === void 0 ? void 0 : req.body);
        if (error) {
            throw new Error(error === null || error === void 0 ? void 0 : error.message);
        }
        value.password = yield (0, bcrypt_1.hashPassword)(value.password);
        const result = yield userModel_1.default.create(value);
        if (result) {
            const token = (0, jwt_1.generateToken)({ email: result === null || result === void 0 ? void 0 : result.email, _id: result === null || result === void 0 ? void 0 : result._id });
            res.cookie('userToken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, sameSite: "none", secure: true });
            res.status(200).json({ status: 'success' });
        }
        else {
            throw new Error('Failed to create user');
        }
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: (error === null || error === void 0 ? void 0 : error.message) || 'internal server error' });
    }
});
exports.signupController = signupController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { value, error } = loginValidation_1.loginValidation.validate(req === null || req === void 0 ? void 0 : req.body);
        if (error) {
            throw new Error(error === null || error === void 0 ? void 0 : error.message);
        }
        const data = yield userModel_1.default.findOne({ email: value === null || value === void 0 ? void 0 : value.email });
        if (!data) {
            res.status(401).json({ status: 'error', message: 'Invalid email or password' });
            return;
        }
        const match = yield (0, bcrypt_1.validatePassword)(value === null || value === void 0 ? void 0 : value.password, data === null || data === void 0 ? void 0 : data.password);
        if (!match) {
            res.status(401).json({ status: 'error', message: 'Invalid email or password' });
            return;
        }
        const token = (0, jwt_1.generateToken)({ email: data === null || data === void 0 ? void 0 : data.email, _id: data === null || data === void 0 ? void 0 : data._id });
        res.cookie('userToken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, sameSite: "none", secure: true });
        res.status(200).json({ status: 'success' });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.loginController = loginController;
const loginWithGoogleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const googleAccessToken = req.body.googleAccesToken;
        if (googleAccessToken) {
            const response = yield axios_1.default.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${googleAccessToken}`
                }
            });
            const email = response.data.email;
            const existingUser = yield (userModel_1.default === null || userModel_1.default === void 0 ? void 0 : userModel_1.default.findOne({ email: email }));
            if (existingUser) {
                const token = (0, jwt_1.generateToken)({ _id: existingUser._id, email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email });
                res.cookie('userToken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, sameSite: "none", secure: true });
                res.json({ status: 'success', userData: existingUser, }).status(200);
            }
            else {
                const googleData = response.data;
                const userData = {
                    firstName: googleData.firstName,
                    lastName: googleData.lastName,
                    email: googleData.email,
                    password: googleData.sub,
                };
                const newUser = yield userModel_1.default.create(userData);
                if (newUser) {
                    const token = (0, jwt_1.generateToken)({ _id: newUser._id, email: newUser === null || newUser === void 0 ? void 0 : newUser.email });
                    res.cookie('userToken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, sameSite: "none", secure: true });
                    res.status(200).json({ status: 'success', data: newUser }).status(200);
                }
            }
        }
        else {
            throw new Error('Unable to login with google');
        }
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.loginWithGoogleController = loginWithGoogleController;
const fetchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email;
        const data = yield userModel_1.default.findOne({ email });
        res.status(200).json({ status: 'success', data, isAuthenticated: true });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.fetchUser = fetchUser;
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie('userToken', '', { maxAge: 1, httpOnly: true, sameSite: "none", secure: true });
        res.status(200).json({ status: 'success' });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.logoutController = logoutController;
