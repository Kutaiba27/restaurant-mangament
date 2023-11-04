import { Express } from "express";
import cors from "cors"

const secirity= (app:Express)=>{
   app.use(cors())

}

export default secirity 