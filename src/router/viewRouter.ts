import { Request, Response, Router } from 'express'
import checkAuth from '../middlewares/checkAuth'
import urlModel from '../models/urlModel'

const router = Router()

interface IUserId extends Request {
    userId: string
}

// User
router.route('/register').get((_req: Request, res: Response) => {
    return res.render('register')
})
router.route('/login').get((_req: Request, res: Response) => {
    return res.render('login')
})

// Url
router.route('/').get(checkAuth, async (req: Request, res: Response) => {
    const { userId } = req as IUserId

    const userUrls = await urlModel.find({ createdBy: userId })

    return res.render('home', {
        shortUrls: userUrls,
        baseUrl: `${req.protocol}://${req.get('host')}`
    })
})

export default router
