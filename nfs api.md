# types
## User
{
  "id": "uuid",
  "name": "name",
  "last_name": "last name",
  "type": 1,
  "organization": Organization,
  "children": User[],
  "group": Group,
  "image": "url",
  "password": "hashed"
}
## TypeUser
{
  0: admin,
  1: orgAdmin,
  2: Authorized org user (preceptor),
  3: Unauthorized org user (readonly preceptor),
  4: Parent,
  5: Child
}
## Organization
{
  "id": "uuid",
  "name": "North-field School",
  "logo": Logo,
  "theme": "l"/"d",
  "color": "#fff"
}
## Group
{
  "id": "uuid",
  "name": "1F"
}
## Logo
{
  "url": "url",
  "width": 321,
  "height" 132,
}
## Authorization
{
  "id": "uuid",
  "child": "uuid",
  "type": TypeAuthorization,
  "dates": Date[]
}
## TypeAuthorization
{
  "id": "uuid",
  "name": ""
}
## Date
{
  "id": "uuid",
  "date": "01/12/2025"
}

# auth/
## POST login
### req
{
  "user_id": "uuid",
  "password": "password"
}
### res
User
### cookies
nfs_token: jwt


# user/
## GET /
### req
query (name or last_name)
type
group
parent
### res
RawUser[]
## GET {id}
### res
User

## POST /
### req
{
  "name": "",
  "last_name": "",
  "type": 1,
  "group?": "uuid",
  "children": "uuid"[],
  "image": "url",
}
### res
FltaUser
## PATCH /
### req
{
  "name": "",
  "last_name": "",
  "type": 1,
  "group?": "uuid",
  "children": "uuid"[],
  "image": "url",
}
### res
User


# group/
## GET /
### res
Group
## POST /
### req
{
  "name": "1F"
}


# organization/
## GET /
### res
{organizations: Organization[]}
## GET {id}
### res
{organization: Organization}
## POST /
### req
{
  "name": "",
  "logo": Logo,
  "theme": "l"/"d",
  "color": "#fff"
}


# authorization/
## GET type/
### res
TypeAuthorization[]
## POST type/
### req
{
  "name": ""
}
### res
TypeAuthorization

## GET /
### req
type
group
child
date
user
### res
Authorization[]
## POST /
### req 
{
  "type": "uuid",
  "child": "uuid",
  "dates": "31/01/2025"[]
}