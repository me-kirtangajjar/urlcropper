import { Request, Response, Router } from 'express'
import apiController from '../controllers/apiController'
import rateLimit from '../middlewares/rateLimit'
import userController from '../controllers/userController'
import checkAuth from '../middlewares/checkAuth'
import urlController from '../controllers/urlController'

const router = Router()

router.route('/self').get(rateLimit, apiController.self)
router.route('/health').get(apiController.health)

// User
router.route('/register').post(userController.userRegister)
router.route('/login').post(userController.userLogin)

router.route('/logout').get((_req: Request, res: Response) => {
    res.clearCookie('uid')
    return res.redirect('/')
})

// Url
router.route('/:shortUrlId').get(urlController.handleShortId)
router.route('/shortUrls').post(checkAuth, urlController.handleCreateShortUrl)

export default router
