// Create a user model to interact with MongoDB users collection
import MongooseService from "../Common/services/mongoose"
import { model, Model, Schema, Document } from "mongoose"
import { IUser } from "./user_interface"
import { scrypt, randomBytes } from "crypto"
import { promisify } from "util"
import { Password } from "../Common/services/password"
const scryptAsync = promisify(scrypt)


export interface UserDocument extends Document {
    email: string
    password: string
    username: string
}
interface UserModel extends Model<UserDocument> {
    build(attrs: IUser): UserDocument
}

const UserSchema : Schema  = new Schema (
{
    email: { type: String, required: true},
    password:{ type: String, required: true },
        username: { type: String, required: true },
},
{
   toObject: {
transform: function (doc, ret) {},
   },
   toJSON: { 
transform: function (doc,ret) {
    delete ret.password
}
   } 
}

)

UserSchema.pre("save", async function (done){
    if (this.isModified("password")) {
        const hashed = await Password.toHash(this.get("password"))
        this.set("password", hashed)
    }
    done()
})

UserSchema.statics.build = (attrs: IUser) => {
    return new User(attrs)
}
const User = MongooseService.getInstance().model<UserDocument,UserModel>(
    "User",
    UserSchema
)

export default User