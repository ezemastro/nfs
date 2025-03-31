import { Router } from 'express'
import { OrganizationController } from '../controllers/organization'

export const organizationRouter = Router()

organizationRouter.get('/', OrganizationController.getOrganizations)
organizationRouter.get('/:id', OrganizationController.getOrganization)
