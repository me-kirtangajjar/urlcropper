import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import quicker from '../util/quicker'
import httpError from '../util/httpError'
// import responseMessage from '../constant/responseMessage'

interface IAuthenticatedRequest extends Request {
    userId: string
}

interface IDecryptedJwt extends JwtPayload {
    userId: string
}

export default (request: Request, res: Response, next: NextFunction) => {
    try {
        const req = request as IAuthenticatedRequest
        const { cookies } = req

        const { uid } = cookies as {
            uid: string | undefined
        }

        if (uid) {
            const { userId } = quicker.verifyToken(uid) as IDecryptedJwt
            req.userId = userId
            next()
        } else {
            return res.redirect('/login')
        }

        // httpError(next, new Error(responseMessage.UNAUTHORIZED), req, 401)
    } catch (err) {
        return httpError(next, err, request, 500)
    }
}
