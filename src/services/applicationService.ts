import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { TApplicationSchemaCreate, TApplicationSchema } from "../schemas/application.schema";

@injectable()
export class ApplicationService {
    async create(opportunityId: number, body: TApplicationSchemaCreate): Promise<TApplicationSchema>{
        const data = await prisma.application.create({data: { ...body, opportunityId}})
        return data;
    }
    async findMany(opportunityId: number): Promise<TApplicationSchema[]>{
        const data = await prisma.application.findMany({ where: { opportunityId }});
        
        return data;
    }
}