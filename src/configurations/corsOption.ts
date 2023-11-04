import { CorsOptions } from "cors"

const whiteList = ['http://localhost:3000']

const corsOptions:CorsOptions = {
      origin:(orign,callback)=>{
         if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null,true)
         }
         else {
            callback(new Error("not allowed by cors"))
         }   
   },
   optionsSuccessStatus:200
}

export { corsOptions }


// const objectKeys = <T extends object>(obj:T):Array<keyof T>=>{
//    return Object.keys(obj) as Array<keyof T>;
// }