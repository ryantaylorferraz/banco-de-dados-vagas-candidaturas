"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const AppError_1 = require("../errors/AppError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class validateToken {
    static execute(req, res, next) {
        const authorization = req.headers.authorization;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer ", "");
        if (!token) {
            throw new AppError_1.AppError(401, "Token in required");
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        res.locals.decode = jsonwebtoken_1.default.decode(token);
        next();
    }
}
exports.validateToken = validateToken;
