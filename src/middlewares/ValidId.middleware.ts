import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";

export class ValidId {
    static execute(req: Request, res: Response, next: NextFunction){
        const id = req.params.id

        const opportunity = prisma.opportunity.findFirst({
            where: { id: Number(id)}
        })

        if(!opportunity){
            throw new AppError(404, "opportunity not found")
        }

        res.locals.opportunity = opportunity

        next();
    }
}