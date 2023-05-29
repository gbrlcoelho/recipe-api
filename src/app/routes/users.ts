import {Router} from 'express'
import {UserController} from '../controllers'
import {authenticateToken} from '../middlewares'

export const userRoutes = Router()

userRoutes.post('/login', UserController.login)
userRoutes.post('/', UserController.store)
userRoutes.use(authenticateToken)
userRoutes.get('/', UserController.index)
userRoutes.get('/:id', UserController.show)
