/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { useTypeORM } from "../databases/typeorm"
import UsersEntity from "../databases/entity/users.entity";
import { ValidationException, validation, userSchema } from "../utility/reqValidation";
import { createRefreshToken, createAccessToken } from "../utility/createToken";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { ObjectLiteral, QueryFailedError } from "typeorm";

const createUser = async (req: Request, res: Response) => {
   try {
      validation(userSchema, req.body)
      // eslint-disable-next-line prefer-const
      let { name, email, password } = req.body
      const foundUser = await UsersEntity.findOne({where:{email:email}})
      if(foundUser){
         throw foundUser
      }
      const salt = genSaltSync(10)
      password = hashSync(password, salt)
      const userInfo = new UsersEntity()
      userInfo.name = name
      userInfo.password = password
      userInfo.email = email
      userInfo.refreshToken = []
      const user:UsersEntity =  await useTypeORM(UsersEntity).save(userInfo);
      user.refreshToken = [...user.refreshToken,createRefreshToken(user.name,user.id)]
      await user.save()
      res.cookie("refresh",user.refreshToken,/*{httpOnly:true}*/)
      res.cookie("access",createAccessToken(user.name,user.id),{/*httpOnly:true,*/  })
      res.status(200).json({ user })

   } catch (error) {
      if (error instanceof ValidationException) {
         const err = JSON.stringify(error.details)
         console.log("the error " + JSON.parse(err)[0].message)
         res.json({ Error: JSON.parse(err)[0].message })
      }
      console.log(error)
      res.json({ error})
   }
}

const getAllUsers = async (req: Request, res: Response) => {
   try {
      const uesrs = await useTypeORM(UsersEntity).find({
         select: {
            name: true,
            email: true,
         }
      })
      res.send(uesrs)
   } catch (error) {
      console.log(error)
   }
}

const getUser = async (req: Request, res: Response) => {
   const userId = req.params.userId
   try {
      const user = await useTypeORM(UsersEntity).find({
         select: {
            name: true,
            email: true,
         }, where: [{ id: parseInt(userId) }]
      })
      res.json({ user })
   } catch (error) {
      console.log(error)
   }
}

const updateUser = async (req: Request, res: Response) => {
   const userId = req?.user.id;
   try {
      const userUpdate = await useTypeORM(UsersEntity).update(parseInt(userId), req.body)
      res.json({ userUpdate })
   } catch (error) {
      console.log(error)
   }
}

const userBooking = async (req: Request, res: Response) => {
   const userId = req.user.id;
   try {
      const user = await useTypeORM(UsersEntity).findOne({
         relations: {
            booking:{
               room:true,
               hotal:true
            }
         },
         where: {
            id: userId
         },
         select:{
            id:true,
            booking:true,
         }
      });
      res.status(200).json({ booking: user });
   } catch (error) { 

      console.log((error as QueryFailedError).name,(error as QueryFailedError).message);
      res.status(500).json({ message: 'Internal server error' });
   }
}

const singIn = async (req: Request, res: Response)=>{
   const {email,password} = req.body;
   try {
      const user:ObjectLiteral | null = await useTypeORM(UsersEntity).findOne({where:{email:email}})
      if (!user){
         return res.status(404).json({message:"user not found please login"})
      }
      const reslut = compareSync(password, user.password)
      if(!reslut){
         return res.status(404).json({message:"password or email mismatch"})
      }
      user.refreshToken = user.refreshToken.filter((token: string) => token !== req.cookies.refresh )
      const refresh:string = createRefreshToken(user.name,user.id)
      user.refreshToken =  [...user.refreshToken, refresh]
      await user.save()
      res.cookie("refresh",user.refreshToken,/*{httpOnly:true}*/)
      res.cookie("access",createAccessToken(user.name,user.id),/*{httpOnly:true}*/)
      res.status(200).json({message:"success"})
   } catch (error) {
      res.json({error: error});
   }
}

const logOut = async (req:Request, res:Response)=>{
   try {
      const userId = req.user.id;
      const refresh = req.cookies.refresh
      const user:ObjectLiteral|null = await useTypeORM(UsersEntity).findOne({where:{id:userId}})
      user!.refreshToken = user!.refreshToken.filter((token:string)=> token!== refresh);
      const userSave = await user!.save()
      res.cookie("refresh","")
      res.cookie("access","")
      res.status(200).json({message:'you are logout'})
   } catch (error) {
      console.log("the are an error")
   }
}

export {
   createUser,
   getAllUsers,
   getUser,
   updateUser,
   userBooking,
   singIn,
   logOut,
}




