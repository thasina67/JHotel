import { NextFunction, Request, Response } from "express-serve-static-core";
import jwt, { JwtPayload } from 'jsonwebtoken'

declare global {
    namespace Express {               // It defines a namespace for the Express module in TypeScript.
        interface Request {           // It extends the Request interface in the Express module.
            userId: string           //It adds a new property userId of type string to the Request interface.
        }
    }
}                               //userId is acustom,not in the Request thats why.TypeScript declaration that extends the Express.js Request interface.

const verifyToken = (req:Request, res:Response, next: NextFunction)=>{
    const token = req.cookies["auth token"]
    if(!token){
        return res.status(401).json({message: "unauthorized"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
        req.userId = (decoded as JwtPayload).userId
        next()
    } catch(error){
        return res.status(401).json({message: "unauthorized"})
    }
}

export default verifyToken