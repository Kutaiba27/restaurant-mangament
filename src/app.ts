import express, { Express, Response, Request, NextFunction}  from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import 'reflect-metadata'

import { dbConnection} from "./configurations/db.connection";
import { AdminRouter }  from './routes/admin.router'
import { VindorRouter }  from './routes/vindor.router'
import {ApiError} from "./utility/error/apierror";
import {globalError} from "./utility/error/globalError";
import {ShoppingRouter} from "./routes/shopping.router";
import {CustomerRouter} from "./routes/cutomer.router";
import {CartRouter} from "./routes/cart.router";
import { OrderRouter } from './routes/order.router'

dotenv.config({path: '.env'})

const app:Express = express()
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())


app.use('/admin', AdminRouter)
app.use('/vindor', VindorRouter)
app.use('/customer',CustomerRouter)
app.use('/cart',CartRouter)
app.use(ShoppingRouter)
app.use('/order', OrderRouter)


app.use('*',(req:Request,res:Response,next:NextFunction)=>{
   next(new ApiError("the route not founssssssssd",404))
})

app.use(globalError)

dbConnection.then(()=>{
   app.listen(process.env.PORT,()=>{
      console.log(`the server is running ${process.env.PORT}`)
   })
}).catch((error)=>{
   console.log("there are an error an connicion to database ",error)
})

