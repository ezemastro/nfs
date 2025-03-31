import { type Request, type Response } from 'express'
import { AuthorizationModel } from '../models/authorization'
import { verifyDate, verifyId } from '../utils/verify'
import { type DbDate, type GetAuthorizationsParams } from '../types/types'

export class AuthorizationController {
  static getTypes = async (req: Request, res: Response) => {
    const { success, message, authorizationTypes } = await AuthorizationModel.getTypes({ organization: req.user.organization })

    if (!success) {
      res.status(400).json({ message })
      return
    }

    res.status(200).json({ authorization_types: authorizationTypes })
  }

  static createType = async (req: Request, res: Response) => {
    const { name } = req.body
    if (name === undefined) {
      res.status(400).json({ message: 'Invalid request' })
      return
    }
    const { success, message, authorizationType } = await AuthorizationModel.createType({ organization: req.user.organization, name })

    if (!success) {
      res.status(400).json({ message })
      return
    }

    res.status(201).json({ authorization_type: authorizationType })
  }

  static getAuthorizations = async (req: Request, res: Response) => {
    const { type, group, child, date } = req.query

    const parsedParams: GetAuthorizationsParams = {
      organization: req.user.organization
    }

    if (typeof child === 'string' && verifyId(child).success) parsedParams.child = child
    if (typeof type === 'string' && verifyId(type).success) parsedParams.type = type
    if (typeof group === 'string' && verifyId(group).success) parsedParams.group = group
    if (typeof date === 'string' && verifyDate(date).success) parsedParams.date = date.split('/').reverse().join('-') as DbDate

    const { success, message, authorizations } = await AuthorizationModel.getAuthorizations(parsedParams)

    if (!success) {
      res.status(400).json({ message })
      return
    }

    const parsedAuthorizations = authorizations?.map((authorization) => {
      return {
        ...authorization,
        dates: authorization.dates.map((date) => {
          return date.split('-').reverse().join('/')
        })
      }
    })
    res.status(200).json({ authorizations: parsedAuthorizations })
  }

  static getAuthorization = async (req: Request, res: Response) => {
    const { id } = req.params

    if (typeof id !== 'string' || !verifyId(id).success) {
      res.status(400).json({ message: 'Invalid request' })
      return
    }

    const { success, message, authorization } = await AuthorizationModel.getAuthorization(id)

    if (!success) {
      res.status(400).json({ message })
      return
    }

    res.status(200).json({ authorization })
  }

  static createAuthorization = async (req: Request, res: Response) => {
    const { type, child, dates } = req.body

    if (typeof type !== 'string' || !verifyId(type).success) {
      res.status(400).json({ message: 'Invalid authorization type' })
      return
    }
    if (typeof child !== 'string' || !verifyId(child).success) {
      res.status(400).json({ message: 'Invalid authorization child' })
      return
    }
    if (!Array.isArray(dates) || dates.some((date) => typeof date !== 'string' || !verifyDate(date).success)) {
      res.status(400).json({ message: 'Invalid authorization date' })
      return
    }

    const { success, message, authorization } = await AuthorizationModel.createAuthorization({ type, child, dates })

    if (!success) {
      res.status(400).json({ message })
      return
    }

    res.status(200).json({ authorization })
  }
}
