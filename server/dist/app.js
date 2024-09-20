"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const nocache_1 = __importDefault(require("nocache"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dbConfig_1 = require("./config/dbConfig");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3500;
(0, dbConfig_1.connectDb)();
const corsOptions = {
    origin: (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.FRONT_END_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use((0, nocache_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/user', userRoutes_1.default);
app.use('/task', taskRoutes_1.default);
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});
app.listen(port, () => {
    console.log(`server running on the port ${port}`);
});
