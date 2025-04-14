const API_URL = 'http://192.168.1.20:3000'
export const login = async (req: { user_id: string, password: string }): Promise<{ user: User }> => {
  const res = await fetch(API_URL + '/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message as string)
  return data
}

export const getUsers = async (req: { type?: string, group?: string, parent?: string, organization?: string }): Promise<{ users: FlatUser[] }> => {
  const query = Object.fromEntries(
    Object.entries(req ?? {}).filter(([_, v]) => v != null)
  )
  const res = await fetch(API_URL + '/user' + '?' + new URLSearchParams(query).toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message as string)
  return data
}

export const getUser = async (id: string): Promise<{ user: FlatUser }> => {
  const res = await fetch(`/user/${id}`, {
    method: 'GET'
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message as string)
  return data
}

export const createUser = async (req: { name: string, last_name: string, type: number, group?: string, image?: string, children?: string[] }): Promise<{ user: FlatUser }> => {
  const res = await fetch(API_URL + '/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message as string)
  return data
}

export const getOrganizations = async (): Promise<{ organizations: Organization[] }> => {
  const res = await fetch(API_URL + '/organization', {
    method: 'GET'
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message as string)
  return data
}

export const getOrganization = async (id: string): Promise<{ organization: Organization }> => {
  const res = await fetch(`/organization/${id}`, {
    method: 'GET'
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message as string)
  return data
}

export const getGroups = async (req?: { organization?: string }): Promise<{ groups: Group[] }> => {
  const query = Object.fromEntries(
    Object.entries(req ?? {}).filter(([_, v]) => v != null)
  )
  const res = await fetch(API_URL + '/group' + '?' + new URLSearchParams(query).toString(), {
    method: 'GET'
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message as string)
  return data
}

export const createGroup = async (req: { name: string }): Promise<{ group: Group }> => {
  const res = await fetch(API_URL + '/group', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message as string)
  return data
}

export const getAuthorizationTypes = async (): Promise<{ authorization_types: AuthorizationType[] }> => {
  const res = await fetch(API_URL + '/authorization/type', {
    method: 'GET'
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message as string)
  return data
}

export const createAuthorizationType = async (req: { name: string }): Promise<{ authorization_type: AuthorizationType }> => {
  const res = await fetch(API_URL + '/authorization/type', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message as string)
  return data
}

export const getAuthorizations = async (req: { type?: string, group?: string, child?: string, date?: string }): Promise<{ authorizations: Authorization[] }> => {
  const query = Object.fromEntries(
    Object.entries(req).filter(([_, v]) => v != null)
  )
  const res = await fetch(API_URL + '/authorization' + '?' + new URLSearchParams(query).toString(), {
    method: 'GET'
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message as string)
  return data
}

export const getAuthorization = async (id: string): Promise<{ authorization: Authorization }> => {
  const res = await fetch(`/authorization/${id}`, {
    method: 'GET'
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message as string)
  return data
}

export const createAuthorization = async (req: { type: string, child: string, dates: string[] }): Promise<{ authorization: Authorization }> => {
  const res = await fetch(API_URL + '/authorization', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message as string)
  return data
}
