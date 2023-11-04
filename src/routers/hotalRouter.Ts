/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import { hotalController } from "../controllers/hotalController";
const router = Router()

router.post('/create', hotalController.createHotail)
      .put('/update', hotalController.updateHotail)
      .get('/nameHotal',hotalController.nametHotal)
      .get('/typeHotal',hotalController.typeHotal)


export { router as HotalRouter }