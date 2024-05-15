// import "express-async-errors"
import "reflect-metadata"
import express, { json } from "express"
import helmet from "helmet"
import { OpportunityRouter } from "./routes/opportunity.route"
import { HandleError } from "./middlewares/handleError.middleware"
import { userRouter } from "./routes/user.router"


export const app = express()

app.use(helmet())

app.use(json())

app.use("/opportunities", OpportunityRouter)

app.use("/users", userRouter)
app.use(HandleError.execute)