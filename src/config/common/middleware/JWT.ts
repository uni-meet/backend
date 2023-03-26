// Validation of user based on JWT token
import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import debug , { IDebugger } from "debug";


const JWT_KEY = process.env.JWT_SECRET || "123456"
const log: IDebugger = debug( "middleware: JWT")

class JWT {
    authenticateJWT (req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization
        if (authHeader && authHeader !== "null") {
            log("auth Header", JWT_KEY)
            jwt.verify(authHeader, JWT_KEY, (err: any, user: any) => {
                if (err) {
                    log("Error", err)
                    return res
                    .status(403)
                    .send({ success : false, message: "Token expired"})
                }
                req.user = user
                next()
            })
        } else {
            res.status(403).json({ success: false, message: "UnAuthorized"})
        }
    }
}
export default new JWT ()