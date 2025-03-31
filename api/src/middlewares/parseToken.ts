import { type Request, type NextFunction, type Response } from 'express'
import { verifyToken } from '../utils/jwt'

export const parseToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token
  if (typeof token !== 'string') {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }
  req.user = await verifyToken(token)
  next()
}
