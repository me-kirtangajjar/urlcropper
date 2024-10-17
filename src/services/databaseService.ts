import mongoose from 'mongoose'
import config from '../config/config'
import userModel from '../models/userModel'
import { IUser } from '../types/userTypes'
import urlModel from '../models/urlModel'
import { IUrl } from '../types/urlTypes'

export default {
    connect: async () => {
        try {
            await mongoose.connect(config.DATABASE_URL as string)
            return mongoose.connection
        } catch (err) {
            throw err
        }
    },
    findUserByEmail: (email: string) => {
        return userModel.findOne({ email })
    },
    registerUser: (payload: IUser) => {
        return userModel.create(payload)
    },
    registerUrl: (payload: IUrl) => {
        return urlModel.create(payload)
    }
}
