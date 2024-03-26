/* eslint-disable @typescript-eslint/no-explicit-any */

import {Response,Request,NextFunction} from "express";

export const errorHandler = (fu: (req: Request, res: Response,) => Promise<any>) => {
   return (req: Request, res: Response, next: NextFunction) => {
      fu(req, res).catch( e=>next(e) );
   };
};
