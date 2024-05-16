"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleError = void 0;
const AppError_1 = require("../errors/AppError");
const zod_1 = require("zod");
const jsonwebtoken_1 = require("jsonwebtoken");
class HandleError {
    static execute(error, req, res, next) {
        if (error instanceof AppError_1.AppError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        if (error instanceof zod_1.ZodError) {
            return res.status(422).json(error);
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            return res.status(401).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
exports.HandleError = HandleError;
