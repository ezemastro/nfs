import { randomUUID } from 'node:crypto'
import { db } from '../services/local_db/db'
import { type Group, type DbGroup, type ModelReturn } from '../types/types'

interface GetGroupsReturn extends ModelReturn {
  groups: Group[]
}
interface CreateGroupParams {
  name: string
  organization: string
}
interface CreateGroupReturn extends ModelReturn {
  group: Group
}
export class GroupModel {
  static getGroups = async (organization: string): Promise<GetGroupsReturn> => {
    const [groups] = await db.query<DbGroup[]>('SELECT * FROM `groups` WHERE organization = ?', [organization])

    return {
      success: true,
      groups: groups.map((group) => ({
        id: group.id,
        name: group.name
      }))
    }
  }

  static createGroup = async ({ name, organization }: CreateGroupParams): Promise<CreateGroupReturn> => {
    const id = randomUUID()
    await db.query('INSERT INTO `groups` (id, name, organization) VALUES (?, ?, ?)', [id, name, organization])

    return {
      success: true,
      group: {
        id,
        name
      }
    }
  }
}
