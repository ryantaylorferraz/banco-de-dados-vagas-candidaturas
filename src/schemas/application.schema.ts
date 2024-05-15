import { z } from "zod";

export const applicationSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    email: z.string().email().min(1),
    linkedin: z.string().min(1).url(),
    opportunityId: z.number().positive(),
})

export const applicationSchemaCreate = applicationSchema.omit({id: true, opportunityId: true});

export type TApplicationSchema = z.infer<typeof applicationSchema >;
export type TApplicationSchemaCreate = z.infer<typeof applicationSchemaCreate>;