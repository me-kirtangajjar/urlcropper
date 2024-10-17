import { NextFunction, Request, Response } from 'express'
import httpError from '../util/httpError'
import databaseService from '../services/databaseService'
import mongoose from 'mongoose'
import quicker from '../util/quicker'
import { IUrl, IUrlCreateRequestBody } from '../types/urlTypes'
import urlModel from '../models/urlModel'

interface IUrlCreate extends Request {
    body: IUrlCreateRequestBody
}

interface IUserId extends Request {
    userId: string
}

interface IUrlRedirect extends Request {
    params: {
        shortUrlId: string
    }
}

export default {
    handleCreateShortUrl: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req as IUrlCreate
            const { userId } = req as IUserId

            const shortUrlCode = quicker.generateShortId()

            const payload: IUrl = {
                shortId: shortUrlCode,
                originalUrl: body.originalUrl,
                clicks: 0,
                createdBy: userId as unknown as mongoose.Schema.Types.ObjectId
            }

            await databaseService.registerUrl(payload)

            return res.redirect('/')
            // httpResponse(req, res, 201, responseMessage.SUCCESS, newUrl)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    handleShortId: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { params } = req as IUrlRedirect

            const shortenedUrl = await urlModel.findOneAndUpdate({ shortId: params.shortUrlId }, { $inc: { clicks: 1 } }, { new: true })

            if (!shortenedUrl) {
                res.status(404).json({ error: 'Short URL not found' })
                return
            }

            res.redirect(shortenedUrl.originalUrl)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    }
}
