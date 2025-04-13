import { type RowDataPacket } from 'mysql2'

type UUID = string
type DbDate = `${number}-${number}-${number}`
type QueryDate = `${number}/${number}/${number}`
interface Organization {
  id: UUID
  name: string
  logo: string
  theme: 'L' | 'D'
  color: string
  logo_wxh: string
}
interface Group {
  id: UUID
  name: string
}
interface RawUser {
  id: UUID
  password?: string | null
  name: string
  last_name: string
  type: number
  organization: string
  group?: string | null
  image?: string | null
}
type FlatUser = Omit<RawUser, 'password'>
interface User {
  id: UUID
  name: string
  last_name: string
  type: number
  organization: Organization
  children?: FlatUser[]
  group?: Group
  image?: string
}
interface RawAuthorization {
  id: UUID
  child: UUID
  type: UUID
}
interface FlatAuthorization extends RawAuthorization {
  dates: DbDate[]
}
interface MixedAuthorization {
  authorization_id: UUID
  authorization_type_id: UUID
  authorization_type_name: string
  authorization_date: Date
  user_id: UUID
  user_name: string
  user_last_name: string
  user_group_id: UUID
  user_image: string
  user_group_name: string
}
interface RawAuthorizationDates {
  id: UUID
  date: DbDate
  authorization: UUID
}
interface AuthorizationType {
  id: UUID
  name: string
}
interface RawAuthorizationType {
  id: UUID
  name: string
  organization: UUID
}
type UserWithoutOrganization = Omit<User, 'organization'>
type DbUser = RowDataPacket & RawUser
type DbFullUser = RowDataPacket & RawUser & Omit<Organization, 'id'> & { child_id: UUID, organization_id: UUID, group_name: string, child_name: string, child_last_name: string, child_image: string, child_type: number, child_group_id: UUID, child_group_name: string }
type DbOrganization = RowDataPacket & Organization
type DbGroup = RowDataPacket & Group
type DbAuthorization = RowDataPacket & MixedAuthorization
type DbAuthorizationTypes = RowDataPacket & RawAuthorizationType
interface Authorization {
  id: UUID
  child: UserWithoutOrganization
  type: AuthorizationType
  dates: DbDate[]
}

interface TokenPayload {
  id: UUID
  organization: string
  type: number
}
interface GetUsersParams {
  organization: string
  query?: string
  type?: string
  group?: string
  parent?: string
}
interface GetAuthorizationsParams {
  organization: string
  type?: UUID
  child?: UUID
  date?: DbDate
  user?: UUID
  group?: UUID
}
interface ModelReturn {
  success: boolean
  message?: string
}
