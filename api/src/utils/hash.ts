import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../config'

export const hash = async (str: string) => {
  return await bcrypt.hash(str, Number(SALT_ROUNDS))
}
export const compare = async (str: string, hash: string) => {
  return await bcrypt.compare(str, hash)
}
