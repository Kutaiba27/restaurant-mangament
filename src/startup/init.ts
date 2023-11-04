import { Express } from "express";
import TyepORMConnection from "../databases/typeorm";
const appSetup = (app:Express) => {
   const APP_PORT = 3000;
   TyepORMConnection()
   .then(()=> console.log("connection established"))
   .then(()=>app.listen(APP_PORT,()=>{console.log("server is listening")}))
   
}

export default appSetup;