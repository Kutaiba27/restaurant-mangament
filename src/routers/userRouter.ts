import { Router, } from "express";
import { createUser, getAllUsers, getUser, singIn, updateUser, userBooking, logOut } from "../controllers/userController";
import { verifyToken } from "../middlewares/veryfiyToken";
const router = Router()

router.post('/login',createUser)
      .post('/signIn',singIn)
      .post('/logOut',verifyToken,logOut)
      .get('/allUsers',verifyToken,getAllUsers)
      .get('/booking',verifyToken,userBooking)
      .get('/getUser/:userId',verifyToken,getUser )
      .put('/update/:userId',verifyToken,updateUser)


export { router as UserRouter } 