import { type Request, type Response } from 'express'
import { verifyPassword } from '../utils/verify'
import { AuthModel } from '../models/auth'

export class AuthController {
  static login = async (req: Request, res: Response) => {
    const { user_id: userId, password } = req.body

    // validation
    if (typeof password !== 'string' || typeof userId !== 'string') {
      res.status(400).json({ message: 'Invalid request' })
      return
    }
    if (!verifyPassword(password).success) {
      res.status(400).json({ message: 'Invalid password' })
      return
    }

    const { success, message, user, token } = await AuthModel.login(userId, password)

    if (!success) {
      res.status(401).json({ message })
      return
    }

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none'
      })
      .status(200)
      .json({ user })
  }
}
