import { Router } from "express";
import { availaibleRoom, availaibleRoomInCity, avaliable, roomPriceInCity } from "../controllers/exploreContruller";

const router = Router();
router.get('/avaliableRoom', availaibleRoom)
      .get('/avaliabl',avaliable)
      .get('/avaliableRoomInCity',availaibleRoomInCity)
      .get('/roomPriceInCity',roomPriceInCity)

export { router as ExploreRouter }