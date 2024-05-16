"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpportunityService = void 0;
const tsyringe_1 = require("tsyringe");
const prisma_1 = require("../database/prisma");
let OpportunityService = class OpportunityService {
    create(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newOpportunity = Object.assign(Object.assign({}, body), { userId });
            const data = yield prisma_1.prisma.opportunity.create({ data: newOpportunity });
            return data;
        });
    }
    findMany(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // const data = await prisma.opportunity.findMany({
            //     orderBy: {
            //         id: 'asc'
            //     }
            // })
            const data = yield prisma_1.prisma.opportunity.findMany({ where: { userId } });
            return data;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_1.prisma.opportunity.findFirst({
                where: { id }
            });
            return data;
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_1.prisma.opportunity.update({
                where: { id }, data: body
            });
            return data;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.opportunity.delete({
                where: { id }
            });
        });
    }
};
exports.OpportunityService = OpportunityService;
exports.OpportunityService = OpportunityService = __decorate([
    (0, tsyringe_1.injectable)()
], OpportunityService);
