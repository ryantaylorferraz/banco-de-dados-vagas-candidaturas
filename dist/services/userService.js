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
exports.userService = void 0;
const user_schema_1 = require("../schemas/user.schema");
const prisma_1 = require("../database/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = require("../errors/AppError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class userService {
    constructor() {
        this.register = (body) => __awaiter(this, void 0, void 0, function* () {
            const hashPassword = yield bcrypt_1.default.hash(body.password, 10);
            const newUser = Object.assign(Object.assign({}, body), { password: hashPassword });
            const user = yield prisma_1.prisma.user.create({ data: newUser });
            return user_schema_1.userReturnSchema.parse(user);
        });
        this.login = (body) => __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findFirst({ where: { email: body.email } });
            if (!user) {
                throw new AppError_1.AppError(404, "User not registered");
            }
            const compare = yield bcrypt_1.default.compare(body.password, user.password);
            if (!compare) {
                throw new AppError_1.AppError(401, "Email and password doesn't match");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
            return { acessToken: token, user: user_schema_1.userReturnSchema.parse(user) };
        });
        this.getUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findFirst({ where: { id } });
            return user_schema_1.userReturnSchema.parse(user);
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findMany();
            return user_schema_1.userReturnAll.array().parse(user);
        });
    }
}
exports.userService = userService;
