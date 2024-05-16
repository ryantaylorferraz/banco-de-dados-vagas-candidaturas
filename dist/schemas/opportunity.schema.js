"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpportunitySchema = exports.TOpportunitySchema = exports.opportunitySchema = void 0;
const zod_1 = require("zod");
exports.opportunitySchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    userId: zod_1.z.number().positive()
});
exports.TOpportunitySchema = exports.opportunitySchema.omit({ id: true, userId: true });
exports.OpportunitySchema = exports.TOpportunitySchema.partial();
