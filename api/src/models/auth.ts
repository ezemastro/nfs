import { db } from '../services/local_db/db'
import { type User, type DbUser, type DbOrganization } from '../types/types'
import { compare } from '../utils/hash'
import { signToken } from '../utils/jwt'

interface LoginReturn {
  success: boolean
  message?: string
  user?: User
  token?: string
}

export class AuthModel {
  static async login (userId: string, password: string): Promise<LoginReturn> {
    const [users] = await db.query<DbUser[]>('SELECT * FROM users WHERE id = ?', [userId])

    if (users.length === 0) {
      throw new Error('User not found')
    }

    const user = users[0]

    // default password
    if (user.password === undefined) {
      // TODO - Implement default password in first login
      return { success: false }
    }

    // compare password
    if (!await compare(password, user.password)) {
      return {
        success: false,
        message: 'Invalid password'
      }
    }

    // generate token
    const token = await signToken({
      id: user.id,
      type: user.type,
      organization: user.organization
    })

    const [organizations] = await db.query<DbOrganization[]>('SELECT * FROM organizations WHERE id = ?', [user.organization])
    const organization = organizations[0]

    const [children] = await db.query<DbUser[]>('SELECT u.* FROM users u JOIN children_dependencies cd ON u.id = cd.child WHERE cd.parent = ?', [user.id])

    const parsedUser: User = {
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      type: user.type,
      organization: {
        id: user.organization,
        name: organization.name,
        logo: organization.logo,
        theme: organization.theme,
        color: organization.color,
        logo_wxh: organization.logo_wxh
      },
      children: children.map((child) => ({
        id: child.id,
        name: child.name,
        last_name: child.last_name,
        type: child.type,
        organization: user.organization,
        group: child.group
      })),
      group: user.group === null
        ? {
            id: user.group,
            name: user.group
          }
        : undefined,
      image: user.image
    }

    return { success: true, user: parsedUser, token }
  }
}
