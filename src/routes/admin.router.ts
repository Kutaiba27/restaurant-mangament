/* eslint-disable @typescript-eslint/no-unused-vars */

import { Router, Request, Response, NextFunction } from 'express'
import {Authorization} from "../middlewares/auth.middleware";
import {createVinder,getVinders,getVindor} from "../controllers/admin.controller";

const router:Router = Router()

router.post('/vindor', createVinder)
   .get('/vindors', getVinders)
   .get('/vindor/:id',getVindor)

export { router as AdminRouter }