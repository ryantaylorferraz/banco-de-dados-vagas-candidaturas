import { Router } from "express";
import { container } from "tsyringe";
import { userService } from "../services/userService";
import { userController } from "../controllers/userController";
import { validateToken } from "../middlewares/validateToken.middleware";
import { ValidBody } from "../middlewares/ValideBody.middleware";
import { userLoginSchema, userRegisterSchema } from "../schemas/user.schema";
import { isEmailUnique } from "../middlewares/isEmailUnique.middleware";


container.registerSingleton("UserService", userService)

const UserController = container.resolve(userController)

export const userRouter = Router()

userRouter.post("/", isEmailUnique.execute, ValidBody.execute(userRegisterSchema),  (req, res) => UserController.register(req, res))
userRouter.post("/login", ValidBody.execute(userLoginSchema), (req, res) => UserController.login(req, res))
userRouter.get("/", validateToken.execute, (req, res) => UserController.getUser(req, res))
userRouter.get("/todos", (req, res) => UserController.getAll(req, res))