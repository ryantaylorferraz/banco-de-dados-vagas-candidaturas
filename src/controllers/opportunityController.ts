import { Request, Response } from "express";
import { OpportunityService } from "../services/opportunityService";
import { inject, injectable } from "tsyringe";

@injectable()
export class OpportunityController {
  constructor(@inject ("OpportunityService") private opportunityServices: OpportunityService){}

  async create(req: Request, res: Response) {
    const {id} = res.locals.decode
    const response = await this.opportunityServices.create(req.body, id);

    return res.status(201).json(response);
  }
  async findMany(req: Request, res: Response) {
    const id = res.locals.decode?.id

    const response = await this.opportunityServices.findMany(id);

    return res.status(200).json(response);
  }



  async findOne(req: Request, res: Response) {
    const response = await this.opportunityServices.findOne(Number(req.params.id));
    return res.status(200).json(response);
  }
  async update(req: Request, res: Response) {
    const response = await this.opportunityServices.update(
      Number(req.params.id),
      req.body
    );

    return res.status(200).json(response);
  }
  async delete(req: Request, res: Response) {

    await this.opportunityServices.delete(Number(req.params.id));

    return res.status(204).json();
  }
}
