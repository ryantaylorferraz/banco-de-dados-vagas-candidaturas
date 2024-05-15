import { inject, injectable } from "tsyringe";
import { userService } from "../services/userService";
import { Request, Response } from "express";

@injectable()
export class userController {
    constructor(@inject("UserService") private userService: userService){}

    public register = async (req: Request, res: Response): Promise<Response> => {

        const response = await this.userService.register(req.body)

        return res.status(201).json(response)

    }
    public login = async (req: Request, res: Response): Promise<Response> => {
        const response = await this.userService.login(req.body)

        return res.status(200).json(response)

    }
    public getUser = async (req: Request, res: Response) => {

        const id = res.locals.decode.user;
        console.log(res.locals.decode);
        

        const response = await this.userService.getUser(id)

        return res.status(200).json(response)
    }
    public getAll = async (req: Request, res: Response) => {

        const response = await this.userService.getAll()

        return res.status(200).json(response)
    }

}