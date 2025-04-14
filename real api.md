# TYPES
## User 
{
  id,
  name,
  last_name,
  type,
  organization: Organization,
  children: FlatUser,
  group: Group,
  image
}
## FlatUser
{
  id,
  name,
  last_name,
  type,
  organization,
  group,
  image
}
## UserWithoutOrganization
Omit'<'User, 'organization''>'
## Organization
{
  id,
  name,
  logo,
  theme,
  color,
  logo_wxh
}
## Group
{
  id,
  name
}
## AuthorizationType
{
  id,
  name
}
## Authorization
{
  id,
  child: UserWithoutOrganization,
  type: AuthorizationType,
  dates: 'dd/mm/yyyy'[]
}

# /auth
## POST /login
### req
{
  user_id,
  password
}
### res
{
  user: User
}

# /user
## GET /
### req
query
type
group
parent
organization (required if not logged in)
### res
{
  users: FlatUser[]
}
## GET /:id
### res
{
  user: FlatUser
}
## POST /
### req
{
  name,
  last_name,
  type,
  group?,
  image?,
  children?: string[]
}
### res
{
  user: FlatUser
}

# /organization
## GET /
### res
{
  organizations: Organization[]
}
## GET /:id
{
  organization: Organization
}

# /group
## GET /
### req
organization ? (can be directly from cookies)
### res
{
  groups: Group[]
}
## POST /
### req
{
  name
}
### res
{
  group: Group
}

# /authorization
## GET /type
### res
{
  authorization_types: AuthorizationType[]
} 
## POST /type
### req
{
  name
}
### res
{
  authorization_type: AuthorizationType
}

## GET /
### req
type
group
child
date
### res
{
  authorizations: Authorization[]
}
## GET /:id
### res
{
  authorization: Authorization
}
## POST /
### req
{
  type,
  child,
  dates: 'dd/mm/yyyy'[]
}
### res
{
  authorization: Authorization
}