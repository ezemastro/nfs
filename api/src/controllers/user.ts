import { type Request, type Response } from 'express'
import { UserModel } from '../models/user'
import { type FlatUser, type GetUsersParams } from '../types/types'
import { verifyCreateUser } from '../utils/verify'
import { parseToken } from '../middlewares/parseToken'

export class UserController {
  static getUsers = async (req: Request, res: Response) => {
    const { query, type, group, parent } = req.query

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
    console.log(organization)
    const parsedParams: GetUsersParams = {
      organization
    }

    if (typeof query === 'string') parsedParams.query = query
    if (typeof type === 'string') parsedParams.type = type
    if (typeof group === 'string') parsedParams.group = group
    if (typeof parent === 'string') parsedParams.parent = parent

    const { success, message, users } = await UserModel.getUsers(parsedParams)

    if (!success) {
      res.status(400).json({ message })
      return
    }

    res.status(200).json({ users })
  }

  static getUser = async (req: Request, res: Response) => {
    const { id } = req.params

    const { success, message, user } = await UserModel.getUser(id)

    if (!success) {
      res.status(400).json({ message })
      return
    }

    res.status(200).json({ user })
  }

  static createUser = async (req: Request, res: Response) => {
    const user = req.body
    const { organization } = req.user

    if (!verifyCreateUser(user).success) {
      res.status(400).json({ user })
      return
    }

    const { success, message, id } = await UserModel.createUser({
      name: user.name,
      lastName: user.last_name,
      type: user.type,
      group: user.group,
      image: user.image,
      children: user.children,
      organization
    })

    if (!success) {
      res.status(400).json({ message })
      return
    }

    const parsedUser: FlatUser = { ...user, organization, id }
    res.status(200).json({ user: parsedUser })
  }
}
