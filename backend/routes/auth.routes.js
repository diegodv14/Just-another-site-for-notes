import { Router } from 'express'
import { GetLogin, GetLogout, GetRegister } from '../controllers/AuthControllers.js'
import { ValidateSchema } from '../middlewares/Validator.js'
import { authSchema } from '../schemas/auth.schema.js'

export const AuthRouter = Router()


AuthRouter.post('/register', ValidateSchema(authSchema), GetRegister)

AuthRouter.post('/login', ValidateSchema(authSchema), GetLogin)

AuthRouter.post('/logout', GetLogout)