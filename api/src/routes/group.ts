import { Router } from 'express'
import { GroupController } from '../controllers/group'
import { parseToken } from '../middlewares/parseToken'

export const groupRouter = Router()

groupRouter.get('/', GroupController.getGroups)
groupRouter.post('/', parseToken, GroupController.createGroup)
