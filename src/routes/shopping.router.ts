import {Router} from "express"
import {
   getRestaurant,
   getFoodAvailability,
   getFoodIn30Min,
   searchFood,
   getTopRestaurant
} from "../controllers/shopping.controller";

const router = Router()
// FoodModel Availablilty
router.get('/:pincode',getFoodAvailability)
   .get('/top-restaurants/:pincode',getTopRestaurant)
   .get('/food-in-30-min/:pincode',getFoodIn30Min)
   .get('/search/:pincode',searchFood)
   .get('/restaurant/:id',getRestaurant)

export  { router as ShoppingRouter}