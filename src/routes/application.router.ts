import { Router } from "express";
import { ApplicationController } from "../controllers/applicationController";
import { ValidBody } from "../middlewares/ValideBody.middleware";
import { applicationSchemaCreate } from "../schemas/application.schema";
import { container } from "tsyringe";
import { ApplicationService } from "../services/applicationService";
import { validateToken } from "../middlewares/validateToken.middleware";

export const ApplicationRouter = Router();


container.registerSingleton("ApplicationService", ApplicationService)

const applicationController = container.resolve(ApplicationController)


ApplicationRouter.post("/:id/applications", ValidBody.execute(applicationSchemaCreate),applicationController.create)
ApplicationRouter.get("/:id/applications", validateToken.execute, (req, res) => applicationController.findMany(req, res))