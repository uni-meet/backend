// Create a user model to interact with MongoDB users collection

import mongoose, { model, Model, Schema, Document } from "mongoose"
import * as bcrypt from "bcrypt"

interface IUser {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    bio: string
}

export interface IUserModel extends IUser, Document {
    checkPassword(password: string): boolean
}
/* user schema structure */
const UserSchema: Schema = new Schema(
    {
        firstName:
        {
            type: String,
            required: true
        },
        lastName:
        {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },

        password:
        {
            type: String,
            required: true
        },
        bio: {
            type: String,
            default: ''
        },
        pictures: [{
            type: mongoose.Types.ObjectId,
            ref: 'Picture'
        }],
        isDeleted: {
            type: Boolean,
            default: false
        }
    })

UserSchema.index({
    username: "text",
    firstName: "text",
    lastName: "text"
})
/**
 * @method User method for encrypting password before saving the user
 */
UserSchema.pre("save", function (next): void {
    const user = this
    bcrypt.hash(user.password, Number(process.env.SALT), function (err, hash) {
        if (err) return next(err)
        user.password = hash
        next()
    })
})
/**
 * @method Check password when user logins using bcrypt
 */

UserSchema.method('checkPassword', function (password: string): boolean {
    if (bcrypt.compareSync(password, this.password)) return true
    return false
})

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema)