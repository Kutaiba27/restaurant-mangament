
import { Router } from "express";
import {  createRoom, updateRoom } from "../controllers/roomController";
const router =  Router();
router.post('/create',createRoom)
      .put('/updateRoom/:id',updateRoom)


export { router as RoomRouter}