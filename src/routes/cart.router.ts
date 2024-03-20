import {Router} from "express";
import  {addItemToCart,deleteCart,deleteItem,getCart} from '../controllers/cart.controller'
import { Authorization } from "../middlewares/auth.middleware"

const router:Router = Router()
router.use(Authorization)
router.post('/add-item',addItemToCart)
router.get('/get-cart',getCart)
router.delete('/delete-item/:id',deleteItem)
router.delete('/delete-cart',deleteCart)

export { router as CartRouter}
