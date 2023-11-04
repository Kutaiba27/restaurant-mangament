
import { Request, Response, NextFunction } from "express";
import { TokenExpiredError, verify, JwtPayload } from "jsonwebtoken";
import UsersEntity from "../databases/entity/users.entity";
import { createAccessToken } from "../utility/createToken";
import { useTypeORM } from "../databases/typeorm";
import { ObjectLiteral } from "typeorm";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
   const cookies = req.cookies;
   const access = cookies.access;
   const refreshToken = cookies.refresh;
   if (!access) {
      return res.status(403).json({ message: "you should be logged in" });
   }
   try {
      const decodedAccess: JwtPayload | string = verify(access, process.env.ACCESS_TOKEN || "this is an access token");
      req.user = decodedAccess;
      next();
   } catch (accessError) {
      if ((accessError as TokenExpiredError).name === "TokenExpiredError") {
         try {
            const decodedRefresh: JwtPayload | string = verify(refreshToken[0], "this is a refresh token");
            req.user = decodedRefresh;
            const foundUser:ObjectLiteral|null = await useTypeORM(UsersEntity).findOne({where:{id:req.user.id}})
            if (!foundUser) { 
               return res.status(403).send("Refresh token is invalid");
            }
            const newAccessToken:string = createAccessToken(foundUser.name, foundUser.id);
            res.cookie("accessToken", newAccessToken, /*{ httpOnly: true }*/);
            next();
            return;
         } catch (refreshError) {
            res.json({message:"you should sing in again"})
         }
      } else {
         console.log(accessError);
         return res.status(403).json({ message: "Access token is invalid" });
      }
   }
};

