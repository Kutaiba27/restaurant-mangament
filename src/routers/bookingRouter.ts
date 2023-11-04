
import { verifyToken } from "../middlewares/veryfiyToken"
import { Router } from 'express'
import { cansel, reservation } from '../controllers/bookingContruller'

const router = Router()

router.post('/reservation',verifyToken,reservation)
      .delete('/cansel/:idbooking',cansel)

export { router as BookingRouter}