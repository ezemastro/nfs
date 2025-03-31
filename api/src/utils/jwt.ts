import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import { type TokenPayload } from '../types/types'

export const verifyToken = async (token: string) => {
  const parsedToken = jwt.verify(token, JWT_SECRET)
  // TODO - verifications on token
  return parsedToken as TokenPayload
}
export const signToken = async (payload: TokenPayload) => jwt.sign(payload, JWT_SECRET)
