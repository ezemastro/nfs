import { type Request, type Response } from 'express'
import { OrganizationModel } from '../models/organization'

export class OrganizationController {
  static getOrganizations = async (_req: Request, res: Response) => {
    const { success, message, organizations } = await OrganizationModel.getOrganizations()

    if (!success) {
      res.status(400).json({ message })
      return
    }

    res.status(200).json({ organizations })
  }

  static getOrganization = async (req: Request, res: Response) => {
    const { id } = req.params

    const { success, message, organization } = await OrganizationModel.getOrganization(id)

    if (!success) {
      res.status(400).json({ message })
      return
    }

    res.status(200).json({ organization })
  }
}
