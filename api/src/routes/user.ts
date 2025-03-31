import { Router } from 'express'
import { UserController } from '../controllers/user'
import { parseToken } from '../middlewares/parseToken'

export const userRouter = Router()

userRouter.get('/', UserController.getUsers)
userRouter.get('/:id', UserController.getUsers)

userRouter.post('/', parseToken, UserController.createUser)
