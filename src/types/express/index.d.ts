/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as express from "express";
import {AuthPayloud} from "../../dto/auth.dto";

declare global {
   namespace Express {
      interface Request {
         user?: AuthPayloud
      }
   }
}
