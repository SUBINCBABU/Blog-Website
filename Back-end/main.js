import express from "express"
const app=express()
import cors from "cors"
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";
import userRouter from "./userRouter.js"
import dotenv from "dotenv"
import { DB } from "./DB/connection.js";
const __dirname=dirname(fileURLToPath(import.meta.url))
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("/",userRouter)
dotenv.config()
DB()
app.listen(2000)