import { z } from "zod";

export const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    email: z.string().min(1).email(),
    password: z.string().min(8)
})

export type TUser = z.infer<typeof userSchema>

export const userRegisterSchema = userSchema.omit({id: true})

export type TUserRegister = z.infer<typeof userRegisterSchema>

export const userLoginSchema = userRegisterSchema.omit({name: true})

export type TUserLogin = z.infer<typeof userLoginSchema>

export const userReturnSchema = userSchema.omit({password: true})

export type TUserReturn = z.infer<typeof userReturnSchema>

export type TLoginReturn = {
    acessToken: string,
    user: TUserReturn
}

export const userReturnAll = userSchema.omit({password: true})

export type TUserReturnAll = z.infer<typeof userReturnAll>