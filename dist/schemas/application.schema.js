"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationSchemaCreate = exports.applicationSchema = void 0;
const zod_1 = require("zod");
exports.applicationSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email().min(1),
    linkedin: zod_1.z.string().min(1).url(),
    opportunityId: zod_1.z.number().positive(),
});
exports.applicationSchemaCreate = exports.applicationSchema.omit({ id: true, opportunityId: true });
