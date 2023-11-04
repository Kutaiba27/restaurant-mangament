import express from "express"
import secirity from "./startup/security";
import appSetup from "./startup/init";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { UserRouter } from "./routers/userRouter"
import { HotalRouter } from "./routers/hotalRouter"
import { RoomRouter } from "./routers/roomRouter";
import { ExploreRouter } from "./routers/ExploreRouter";
import { BookingRouter } from "./routers/BookingRouter";
import { verifyToken } from "./middlewares/veryfiyToken";
dotenv.config()
const app = express();

secirity(app); 
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/HotalBooking/explore',ExploreRouter)
app.use('/HotalBooking/users',UserRouter )
verifyToken
app.use('/HotalBooking/hotal',HotalRouter)
app.use('/HotalBooking/rooms',RoomRouter)
app.use('/HotalBooking/booking',BookingRouter)
appSetup(app);