import { db } from '../services/local_db/db'
import { type DbOrganization, type ModelReturn, type Organization } from '../types/types'

interface GetOrganizationsReturn extends ModelReturn {
  organizations: Organization[]
}
interface GetOrganizationReturn extends ModelReturn {
  organization: Organization
}
export class OrganizationModel {
  static getOrganizations = async (): Promise<GetOrganizationsReturn> => {
    const [organizations] = await db.query<DbOrganization[]>('SELECT * FROM organizations')

    return {
      success: true,
      organizations: organizations.map((organization) => ({
        id: organization.id,
        name: organization.name,
        logo: organization.logo,
        theme: organization.theme,
        color: organization.color,
        logo_wxh: organization.logo_wxh
      }))
    }
  }

  static getOrganization = async (id: string): Promise<GetOrganizationReturn> => {
    const [organizations] = await db.query<DbOrganization[]>('SELECT * FROM organizations WHERE id = ?', [id])
    const organization = organizations[0]

    return {
      success: true,
      organization: {
        id: organization.id,
        name: organization.name,
        logo: organization.logo,
        theme: organization.theme,
        color: organization.color,
        logo_wxh: organization.logo_wxh
      }
    }
  }
}
