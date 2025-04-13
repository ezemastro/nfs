import { randomUUID } from 'node:crypto'
import { db } from '../services/local_db/db'
import { type DbUser, type GetUsersParams, type ModelReturn, type FlatUser, type UserWithoutOrganization } from '../types/types'

interface GetUsersReturn extends ModelReturn {
  users: FlatUser[]
}
interface GetUserReturn extends ModelReturn {
  user?: UserWithoutOrganization
}
interface CreateUserParams {
  name: string
  lastName: string
  type: number
  group: string
  image?: string
  children?: string[]
  organization: string
}
interface CreateUserReturn extends ModelReturn {
  id?: string
}

export class UserModel {
  static async getUsers (params: GetUsersParams): Promise<GetUsersReturn> {
    const { query, type, group, parent, organization } = params

    let sql = `
      SELECT u.* 
      FROM Users u 
      LEFT JOIN Children_dependencies cd ON u.id = cd.child
      WHERE organization = ?
    `
    const values = [organization]

    if (query !== undefined) {
      sql += ' AND (u.name LIKE ? OR u.last_name LIKE ?)'
      values.push(`%${query}%`, `%${query}%`)
    }
    if (type !== undefined) {
      sql += ' AND u.type = ?'
      values.push(type)
    }
    if (group !== undefined) {
      sql += ' AND u.group = ?'
      values.push(group)
    }
    if (parent !== undefined) {
      sql += ' AND cd.parent = ?'
      values.push(parent)
    }

    const [users] = await db.query<DbUser[]>(sql, values)

    const parsedUsers = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        type: user.type,
        organization: user.organization,
        group: user.group,
        image: user.image
      }
    })

    return { success: true, users: parsedUsers }
  }

  static async getUser (userId: string): Promise<GetUserReturn> {
    const [users] = await db.query<DbUser[]>('SELECT * FROM users WHERE id = ?', [userId])

    if (users.length === 0) {
      return { success: false, message: 'User not found' }
    }

    const user = users[0]

    const [children] = await db.query<DbUser[]>('SELECT u.* FROM users u JOIN children_dependencies cd ON u.id = cd.child WHERE cd.parent = ?', [user.id])

    const parsedUser: UserWithoutOrganization = {
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      type: user.type,
      children: children.map((child) => ({
        id: child.id,
        name: child.name,
        last_name: child.last_name,
        type: child.type,
        organization: user.organization,
        group: child.group
      })),
      group: user.group != null
        ? {
            id: user.group,
            name: user.group
          }
        : undefined,
      image: user.image ?? undefined
    }

    return { success: true, user: parsedUser }
  }

  static async createUser (user: CreateUserParams): Promise<CreateUserReturn> {
    const { name, lastName, type, group, image, organization } = user

    const id = randomUUID()

    await db.query('INSERT INTO users (id, name, last_name, type, `group`, image, organization) VALUES (?, ?, ?, ?, ?, ?)', [id, name, lastName, type, group, image, organization])

    return { success: true, id }
  }
}
