import { z } from "zod";

export const opportunitySchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    description: z.string().min(1),
    userId: z.number().positive()
})

export const TOpportunitySchema = opportunitySchema.omit({id: true, userId: true})
export const OpportunitySchema = TOpportunitySchema.partial()

export type TOpportunityCreate = z.infer<typeof TOpportunitySchema>
export type TOpportunity = z.infer<typeof opportunitySchema>

export type TOpportunityUpdate = z.infer<typeof OpportunitySchema>;

