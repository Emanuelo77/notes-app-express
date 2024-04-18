import { Request, Response, NextFunction } from "express"
import { getAdmin} from "../services/auth"


export function hasAuthentiction(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization

   if (authorization === undefined){
    res.status(401).send("unauthorized")
   } else{
    
   }
}