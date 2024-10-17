import mongoose from 'mongoose'

export interface IUrl {
    shortId: string
    originalUrl: string
    clicks: number
    createdBy: mongoose.Schema.Types.ObjectId
}

export interface IUrlCreateRequestBody {
    originalUrl: string
}

export interface IUrlRedirectRequestBody {
    shortUrlId: string
}
