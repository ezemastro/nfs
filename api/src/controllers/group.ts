import { type Request, type Response } from 'express'
import { GroupModel } from '../models/group'
import { parseToken } from '../middlewares/parseToken'

export class GroupController {
  static getGroups = async (req: Request, res: Response) => {
    let organization: string | undefined

    if (req.cookies.token === undefined) {
      if (req.query.organization === undefined || typeof req.query.organization !== 'string') {
        res.status(400).json({ message: 'Invalid request' })
        return
      }
      organization = req.query.organization
    } else {
      await parseToken(req, res, () => {})
      organization = req.user.organization
    }

    const { success, message, groups } = await GroupModel.getGroups(organization)

    if (!success) {
      res.status(400).json({ message })
      return
    }

    res.status(200).json({ groups })
  }

  static createGroup = async (req: Request, res: Response) => {
    const { name } = req.body
    if (name === undefined) {
      res.status(400).json({ message: 'Invalid request' })
      return
    }
    const { success, message, group } = await GroupModel.createGroup({ name, organization: req.user.organization })

    if (!success) {
      res.status(400).json({ message })
      return
    }

    res.status(200).json({ group })
  }
}
