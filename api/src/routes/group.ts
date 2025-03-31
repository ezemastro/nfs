import { Router } from 'express'
import { GroupController } from '../controllers/group'

export const groupRouter = Router()

groupRouter.get('/', GroupController.getGroups)
groupRouter.post('/', GroupController.createGroup)
