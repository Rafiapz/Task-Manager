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
exports.editTaskController = exports.deleteTaskController = exports.fetchAllTaskController = exports.addTaskController = void 0;
const taskValidation_1 = require("../validation/taskValidation");
const tasksModel_1 = __importDefault(require("../model/tasksModel"));
const addTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { value, error } = taskValidation_1.taskValidation.validate(req === null || req === void 0 ? void 0 : req.body);
        if (error) {
            throw new Error(error === null || error === void 0 ? void 0 : error.message);
        }
        value.userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
        const result = yield tasksModel_1.default.create(value);
        if (!result) {
            throw new Error('Failed to add task');
        }
        res.status(200).json({ status: 'success', data: result });
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
            res.status(500).json({ status: 'error', message: 'The title you entered is already in use. Please choose a different title' });
            return;
        }
        res.status(500).json({ status: 'error', message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.addTaskController = addTaskController;
const fetchAllTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        let sort = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.sort;
        sort = Number(sort);
        const query = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.search;
        if (query) {
            const regx = new RegExp(`^${query}`, "i");
            const data = yield tasksModel_1.default.find({ userId: (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c._id, title: { $regex: regx } }).sort({ createdAt: sort });
            res.status(200).json({ status: 'success', data });
        }
        else {
            const data = yield tasksModel_1.default.find({ userId: (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d._id }).sort({ createdAt: sort });
            res.status(200).json({ status: 'success', data });
        }
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.fetchAllTaskController = fetchAllTaskController;
const deleteTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        yield tasksModel_1.default.deleteOne({ _id: id });
        res.status(200).json({ status: 'success' });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.deleteTaskController = deleteTaskController;
const editTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        yield tasksModel_1.default.updateOne({ _id: id }, { $set: req === null || req === void 0 ? void 0 : req.body });
        res.status(200).json({ status: 'success' });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.editTaskController = editTaskController;
