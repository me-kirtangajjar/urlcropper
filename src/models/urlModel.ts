import mongoose, { Schema, model } from 'mongoose'
import { IUrl } from '../types/urlTypes'

const urlSchema = new Schema<IUrl>(
    {
        shortId: {
            type: String,
            required: true,
            unique: true
        },
        originalUrl: {
            type: String,
            required: true
        },
        clicks: {
            type: Number,
            required: true,
            default: 0
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
)

export default model<IUrl>('url', urlSchema)
