import { injectable } from "tsyringe";
import { TLoginReturn, TUserLogin, TUserRegister, TUserReturn, TUserReturnAll, userReturnAll, userReturnSchema } from "../schemas/user.schema";
import { prisma } from "../database/prisma";
import bcrypt from "bcrypt"
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";


export class userService {

    public register = async (body: TUserRegister): Promise<TUserReturn> => {
        console.log(body);
        
        const hashPassword = await bcrypt.hash(body.password, 10)

        const newUser: TUserRegister = {
            ...body,
            password: hashPassword
        }

        const user = await prisma.user.create({data: newUser})

        return userReturnSchema.parse(user)
    }

    public login = async (body: TUserLogin): Promise<TLoginReturn> => {
        const user = await prisma.user.findFirst({where: { email: body.email }})
        console.log(user);
        

        if(!user) {
            throw new AppError( 404, "User not registered")
        }

        const compare = await bcrypt.compare(body.password, user.password);
        

        if (!compare) {
           throw new AppError(401, "Email and password doesn't match");
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string)

        return {acessToken: token, user: userReturnSchema.parse(user)}
    }

    public getUser = async (id: number): Promise<TUserReturn> => {
        console.log(id);
        const user = await prisma.user.findFirst({where: {id}})
        

        return userReturnSchema.parse(user)
    }
    public getAll = async (): Promise<Array<TUserReturnAll>> => {
        const user = await prisma.user.findMany()
        

        return userReturnAll.array().parse(user)
    }

}