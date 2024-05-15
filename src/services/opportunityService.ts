import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { TOpportunity, TOpportunityCreate, TOpportunityUpdate } from "../schemas/opportunity.schema";

@injectable()
export class OpportunityService {

    async create(body: TOpportunityCreate, userId: number): Promise<TOpportunity>{
        const newOpportunity = {...body, userId}
       const data = await prisma.opportunity.create({data: newOpportunity})
       return data
    }

    async findMany(userId?: number): Promise<TOpportunity[]>{
        // const data = await prisma.opportunity.findMany({
        //     orderBy: {
        //         id: 'asc'
        //     }
        // })
        const data = await prisma.opportunity.findMany({where: {userId}})
        
        return data
    }

    async findOne(id: number): Promise<TOpportunity>{
        const data = await prisma.opportunity.findFirst({
            where: {id}
        })
        return data as TOpportunity;
    }

    
    async update(id: number, body: TOpportunityUpdate): Promise<TOpportunity>{
        const data = await prisma.opportunity.update({
            where: {id}, data: body
        })
        return data;
    }


    async delete(id: number): Promise<void>{
        await prisma.opportunity.delete({
            where: {id}
        })

    }
}