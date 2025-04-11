import express, { type Response, type Request, type NextFunction } from 'express'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import { PORT } from './config'
import { authRouter } from './routes/auth'
import { userRouter } from './routes/user'
import { parseToken } from './middlewares/parseToken'
import { organizationRouter } from './routes/organization'
import { groupRouter } from './routes/group'
import { authorizationRouter } from './routes/authorization'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/organization', organizationRouter)
app.use('/group', groupRouter)
app.use('/authorization', parseToken, authorizationRouter)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: err.message })
})

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT)
})
