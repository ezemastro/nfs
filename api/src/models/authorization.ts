import { randomUUID } from 'node:crypto'
import { db } from '../services/local_db/db'
import { type Authorization, type DbAuthorizationTypes, type AuthorizationType, type ModelReturn, type GetAuthorizationsParams, type DbAuthorization, type DbDate, type FlatAuthorization } from '../types/types'

interface GetTypesReturn extends ModelReturn {
  authorizationTypes: AuthorizationType[]
}
interface CreateTypeReturn extends ModelReturn {
  authorizationType: AuthorizationType
}
interface GetAuthorizationReturn extends ModelReturn {
  authorization?: Authorization
}
interface GetAuthorizationsReturn extends ModelReturn {
  authorizations?: Authorization[]
}
interface AuthorizationByDate extends DbAuthorization {
  dates: DbDate[]
}
interface CreateAuthorizationParams {
  child: string
  type: string
  dates: DbDate[]
}
interface CreateAuthorizationReturn extends ModelReturn {
  authorization?: FlatAuthorization
}
export class AuthorizationModel {
  static getTypes = async ({ organization }: { organization: string }): Promise<GetTypesReturn> => {
    const [types] = await db.query<DbAuthorizationTypes[]>('SELECT * FROM authorization_types WHERE organization = ?', [organization])

    return {
      success: true,
      authorizationTypes: types.map((type) => ({
        id: type.id,
        name: type.name
      }))
    }
  }

  static createType = async ({ organization, name }: { organization: string, name: string }): Promise<CreateTypeReturn> => {
    const id = randomUUID()
    await db.query('INSERT INTO authorization_types (id, organization, name) VALUES (?, ?, ?)', [id, organization, name])

    return {
      success: true,
      authorizationType: {
        id,
        name
      }
    }
  }

  static getAuthorizations = async ({ organization, child, type, group, date }: GetAuthorizationsParams): Promise<GetAuthorizationsReturn> => {
    let sql = `
    SELECT 
      a.id AS authorization_id, 
      a.type AS authorization_type_id, 
      t.name AS authorization_type_name, 
      ad.date AS authorization_date, 
      u.id AS user_id, 
      u.name AS user_name, 
      u.last_name AS user_last_name,
      u.group AS user_group_id,
      u.image AS user_image,
      u.type AS user_type,
      g.name AS user_group_name
    FROM authorizations a
    JOIN authorizations_dates ad ON a.id = ad.authorization
    JOIN users u ON a.child = u.id
    JOIN \`groups\` g ON u.group = g.id
    JOIN authorization_types t ON a.type = t.id
    WHERE u.organization = ?
    `
    const values = [organization]

    if (child !== undefined) {
      sql += ' AND a.child = ?'
      values.push(child)
    }
    if (type !== undefined) {
      sql += ' AND a.type = ?'
      values.push(type)
    }
    if (group !== undefined) {
      sql += ' AND u.group = ?'
      values.push(group)
    }
    if (date !== undefined) {
      sql += ' AND ad.date = ?'
      values.push(date)
    }

    const [authorizations] = await db.query<DbAuthorization[]>(sql, values)

    const authorizationsByDate: AuthorizationByDate[] = []

    authorizations.forEach((authorization) => {
      const index = authorizationsByDate.findIndex((auth) => auth.authorization_id === authorization.authorization_id)
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const date = `${authorization.authorization_date.getFullYear()}-${authorization.authorization_date.getMonth() + 1}-${authorization.authorization_date.getDate()}` as DbDate
      if (index === -1) {
        const parsedAuthorization = {
          ...authorization,
          dates: [date]
        }
        authorizationsByDate.push(parsedAuthorization)
      } else {
        authorizationsByDate[index].dates.push(date)
      }
    })

    return {
      success: true,
      authorizations: authorizationsByDate.map((authorization) => ({
        id: authorization.authorization_id,
        type: {
          id: authorization.authorization_type_id,
          name: authorization.authorization_type_name
        },
        child: {
          id: authorization.user_id,
          name: authorization.user_name,
          last_name: authorization.user_last_name,
          type: authorization.user_type,
          group: {
            id: authorization.user_group_id,
            name: authorization.user_group_name
          },
          image: authorization.user_image
        },
        dates: authorization.dates
      }))
    }
  }

  static getAuthorization = async (id: string): Promise<GetAuthorizationReturn> => {
    const [authorizations] = await db.query<DbAuthorization[]>(`
        SELECT 
          a.id AS authorization_id, 
          a.type AS authorization_type_id, 
          t.name AS authorization_type_name, 
          ad.date AS authorization_date, 
          u.id AS user_id, 
          u.name AS user_name, 
          u.last_name AS user_last_name,
          u.group AS user_group_id,
          u.image AS user_image,
          u.type AS user_type,
          g.name AS user_group_name
        FROM authorizations a
        JOIN authorizations_dates ad ON a.id = ad.authorization
        JOIN users u ON a.child = u.id
        JOIN \`groups\` g ON u.group = g.id
        JOIN authorization_types t ON a.type = t.id
        WHERE a.id = ?
      `, [id])

    const authorization = authorizations[0]
    if (authorization === undefined) {
      return {
        success: false,
        message: 'Authorization not found'
      }
    }
    return {
      success: true,
      authorization: {
        id: authorization.authorization_id,
        type: {
          id: authorization.authorization_type_id,
          name: authorization.authorization_type_name
        },
        child: {
          id: authorization.user_id,
          name: authorization.user_name,
          last_name: authorization.user_last_name,
          type: authorization.user_type,
          group: {
            id: authorization.user_group_id,
            name: authorization.user_group_name
          },
          image: authorization.user_image
        },
        dates: authorizations.map((authorization) => `${authorization.authorization_date.getFullYear()}-${authorization.authorization_date.getMonth() + 1}-${authorization.authorization_date.getDate()}`) as DbDate[]
      }
    }
  }

  static createAuthorization = async ({ child, dates, type }: CreateAuthorizationParams): Promise<CreateAuthorizationReturn> => {
    const id = randomUUID()
    await db.query(`
      INSERT INTO authorizations (id, child, type) VALUES (?, ?, ?);
      INSERT INTO authorizations_dates (authorization, date) VALUES ${dates.map(() => '(?, ?)').join(', ')};
      `, [id, child, type].concat(dates.flatMap((date) => [id, date])))

    return {
      success: true,
      authorization: {
        id,
        type,
        child,
        dates
      }
    }
  }
}
