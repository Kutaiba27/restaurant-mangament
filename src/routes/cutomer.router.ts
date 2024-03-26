import {Router} from "express";

import {
   customerSingIn,
   customerLogIn,
   customerVerify,
   requestOpt,
   getCustomerProfile,
   editCusomerProfile,
   createPaymet,
   webHook
} from '../controllers/cutomer.controller'
import { Authorization } from "../middlewares/auth.middleware";



const router:Router = Router();

router.post('/singin',customerSingIn)
router.post('/login',customerLogIn)
router.post('/web-hook',webHook)
router.use(Authorization)
router.patch('/verify',customerVerify)
router.get('/otp',requestOpt)
router.get('/profile',getCustomerProfile)
router.patch('/profile',editCusomerProfile)

router.post('/create-payment/:orderId',createPaymet)



export  {router as CustomerRouter}