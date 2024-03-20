import {sign} from "jsonwebtoken"
import {AuthPayloud} from "../dto/auth.dto";

export const GeneratSignature = <T extends AuthPayloud>(payload: T)=>{
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
   // @ts-expect-error
   return sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"}).toString()
}

