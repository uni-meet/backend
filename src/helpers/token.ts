/**
 * @fileoverview Create a token
 *
 */
import * as jwt from "jsonwebtoken"


export function createToken(user: any) {
    const body = {
        userId: user._id
    }
      console.log(process.env.ACCESS_TOKEN_SECRET)
    return jwt.sign({ user: { body } }, process.env.ACCESS_TOKEN_SECRET as string)
}