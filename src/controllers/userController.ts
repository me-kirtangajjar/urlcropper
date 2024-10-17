import { NextFunction, Request, Response } from 'express'
import httpError from '../util/httpError'
// import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import { ILoginUserRequestBody, IRegisterUserRequestBody, IUser } from '../types/userTypes'
import databaseService from '../services/databaseService'
import quicker from '../util/quicker'
import { EUserRole } from '../constant/userConstant'

interface IRegisterRequest extends Request {
    body: IRegisterUserRequestBody
}

interface ILoginRequest extends Request {
    body: ILoginUserRequestBody
}

export default {
    userRegister: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req as IRegisterRequest

            const user = await databaseService.findUserByEmail(body.email)
            if (user) {
                return httpError(next, new Error(responseMessage.ALREADY_EXISTS('user', body.email)), req, 404)
            }

            const hashedPassword = quicker.hashPassword(body.password)

            const payload: IUser = {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: hashedPassword,
                role: EUserRole.USER
            }
            await databaseService.registerUser(payload)

            return res.redirect('/login')
            // httpResponse(req, res, 201, responseMessage.SUCCESS, { _id: newUser._id })
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    userLogin: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req as ILoginRequest

            const user = await databaseService.findUserByEmail(body.email)
            if (!user) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('user')), req, 404)
            }

            const isValidPassword = quicker.comparePassword(body.password, user.password)
            if (!isValidPassword) {
                return httpError(next, new Error(responseMessage.INVALID_CREDENTIALS), req, 400)
            }

            const accessToken = quicker.generateToken({ userId: user._id })

            // if (!user) {
            //     return res.render('login', { error: 'Invalid email or password' })
            // }

            res.cookie('uid', accessToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            })

            return res.redirect('/')
            // httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    }
}
