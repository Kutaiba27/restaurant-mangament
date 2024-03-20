import {Router} from "express";
import  { Authorization } from '../middlewares/auth.middleware'
import  {createOrder,getOrderById ,getOrders} from "../controllers/order.controller"

const router:Router = Router()

router.use(Authorization)
router.post('/create-order/:cartId',createOrder)
router.get('/orders',getOrders)
router.get('/order/:id',getOrderById)

export { router as OrderRouter } 