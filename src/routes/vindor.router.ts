/* eslint-disable @typescript-eslint/no-unused-vars */

import { Router, Request, Response, NextFunction } from 'express'
import { 
   LoginVindor, 
   GetVindorProfile, 
   UpdateVindorProfile, 
   UpdateVindorServes,addFood, 
   uploudImageMultibl ,
   getCurrentOrders,
   getOrderDetail,
   processOrder,
   getFood,
   getFoods,
   uploudImageSingle
} from '../controllers/vindor.controller'

import { Authorization } from '../middlewares/auth.middleware'
import { reSizeOndStor } from '../middlewares/resize.middleware'

const router = Router()

router.post('/login', LoginVindor)  
   .get('/profile', Authorization, GetVindorProfile)
   .patch('/profile',Authorization,UpdateVindorProfile)
   .patch('/service',Authorization, UpdateVindorServes)

router.post('/add-food',Authorization,uploudImageMultibl,reSizeOndStor('food'),addFood )
   .get('/food/:id',getFood)
   .get('/foods/',getFoods)

router.get('offers')
   .post('/offer')
   .get('/offer/:id')
   .delete('/offer/:id')


router.get('/order',getCurrentOrders)
   .put('/order/:id/process',processOrder)
   .get('/order/:id',getOrderDetail)


export { router as VindorRouter }