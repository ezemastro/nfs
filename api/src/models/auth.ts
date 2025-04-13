import { db } from '../services/local_db/db'
import { type User, type DbFullUser, type FlatUser } from '../types/types'
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
    const [users] = await db.query<DbFullUser[]>('SELECT u.*, g.name as group_name, o.color , o.logo, o.logo_wxh, o.name as organization_name, o.theme, cd.child as child, ch.id as child_id, ch.`group` as child_group, ch.`type` as child_type, ch.image as child_image, ch.last_name as child_last_name, ch.name as child_name from users u join organizations o on o.id = u.organization left join children_dependencies cd on u.id = cd.parent left join `groups` g on g.id = u.`group` left join users ch on cd.child = ch.id where u.id = ?', [userId])

    if (users.length === 0) {
      throw new Error('User not found')
    }

    const user = users[0]

    // default password
    if (user.password == null) {
      // TODO - Implement default password in first login
      if (password !== 'password') {
        return { success: false }
      }
    } else if (!await compare(password, user.password)) {
      // invalid password
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

    const children: FlatUser[] = users.map((user) => {
      return {
        id: user.child,
        name: user.child_name,
        last_name: user.child_last_name,
        type: user.child_type,
        organization: user.organization,
        group: user.child_group ?? undefined,
        image: user.child_image ?? undefined
      }
    })

    const parsedUser: User = {
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      type: user.type,
      organization: {
        id: user.organization,
        name: user.organization_name,
        logo: user.logo,
        theme: user.theme,
        color: user.color,
        logo_wxh: user.logo_wxh
      },
      children: children.filter((child) => children.findIndex((c) => c.id === child.id) === 0),
      group: user.group != null
        ? {
            id: user.group,
            name: user.group
          }
        : undefined,
      image: user.image ?? undefined
    }

    return { success: true, user: parsedUser, token }
  }
}
