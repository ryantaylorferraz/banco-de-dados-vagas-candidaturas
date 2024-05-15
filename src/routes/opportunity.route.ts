import { Router } from "express";
import { OpportunityController } from "../controllers/opportunityController";
import { ApplicationRouter } from "./application.router";
import { OpportunitySchema, TOpportunitySchema } from "../schemas/opportunity.schema";
import { ValidBody } from "../middlewares/ValideBody.middleware";
import { container } from "tsyringe";
import { OpportunityService } from "../services/opportunityService";
import { validateToken } from "../middlewares/validateToken.middleware";
import { isOpportunityOwner } from "../middlewares/isOpportunityOwner.middleware";
import { ValidId } from "../middlewares/ValidId.middleware";

export const OpportunityRouter = Router()

container.registerSingleton("OpportunityService", OpportunityService)
const opportunityController = container.resolve(OpportunityController)

OpportunityRouter.post("/", validateToken.execute, ValidBody.execute(TOpportunitySchema), (req, res) => opportunityController.create(req, res))

OpportunityRouter.get("/", (req, res) => opportunityController.findMany(req, res))
OpportunityRouter.get("/user", validateToken.execute, (req, res) => opportunityController.findMany(req, res))

OpportunityRouter.get("/:id", ValidId.execute, validateToken.execute, isOpportunityOwner.execute, (req, res) => opportunityController.findOne(req, res))
OpportunityRouter.patch("/:id", validateToken.execute, isOpportunityOwner.execute, ValidBody.execute(OpportunitySchema), opportunityController.update)
OpportunityRouter.delete("/:id",  validateToken.execute, isOpportunityOwner.execute, (req, res) => opportunityController.delete(req, res))

OpportunityRouter.use("/", ApplicationRouter)
