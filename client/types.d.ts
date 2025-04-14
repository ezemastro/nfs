interface Organization {
  id: string
  name: string
  logo: string
  theme: 'L' | 'D'
  color: string
  logo_wxh: string
}

interface Group {
  id: string
  name: string
}

interface AuthorizationType {
  id: string
  name: string
}

interface FlatUser {
  id: string
  name: string
  last_name: string
  type: number
  organization: string
  group: string
  image: string
}

interface User {
  id: string
  name: string
  last_name: string
  type: number
  organization: Organization
  children: FlatUser[]
  group: Group
  image: string
}

type UserWithoutOrganization = Omit<User, 'organization'>

interface Authorization {
  id: string
  child: UserWithoutOrganization
  type: AuthorizationType
  dates: string[] // 'dd/mm/yyyy' format
}
