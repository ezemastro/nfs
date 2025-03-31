import { type TokenPayload } from './types'
import 'express'

declare global {
  namespace Express {
    interface Request {
      user: TokenPayload
    }
  }
}
