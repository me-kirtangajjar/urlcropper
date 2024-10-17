import { model, Schema } from 'mongoose'
import { IUser } from '../types/userTypes'
import { EUserRole } from '../constant/userConstant'

const userSchema = new Schema<IUser>(
    {
        firstName: { type: String, trim: true, required: true },
        lastName: { type: String, trim: true },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: true
        },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: EUserRole,
            default: EUserRole.USER,
            required: true
        }
    },
    { timestamps: true }
)

export default model<IUser>('user', userSchema)
