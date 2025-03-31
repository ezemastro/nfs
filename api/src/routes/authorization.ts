import { Router } from 'express'
import { AuthorizationController } from '../controllers/authorization'

export const authorizationRouter = Router()

authorizationRouter.get('/type', AuthorizationController.getTypes)
authorizationRouter.post('/type', AuthorizationController.createType)

authorizationRouter.get('/', AuthorizationController.getAuthorizations)
authorizationRouter.get('/:id', AuthorizationController.getAuthorization)
authorizationRouter.post('/', AuthorizationController.createAuthorization)
