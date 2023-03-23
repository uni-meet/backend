import { promisify } from "util";
import { randomBytes, scrypt } from "crypto"
const scryptAsync = promisify(scrypt)

export class Password {
   static async toHash (password: string) {
    const salt = randomBytes(8).toString("hex")
    const buf = ( await scryptAsync(password, salt, 64 )) as Buffer;
    return `${buf.toString("hex")}.${salt}`
   }
   static async compare(storedPassword: string, suppliedPAssword: string) {
    const [hashedPassword,salt] = storedPassword.split(".")
       const buf = (await scryptAsync( suppliedPAssword,salt, 64)) as Buffer; 

      return buf.toString("hex") === hashedPassword
   }
}