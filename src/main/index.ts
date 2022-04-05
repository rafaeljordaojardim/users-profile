import { Router } from 'express'
import UserRouter from './user'
import ProfileRouter from './profile'
import SignInRouter from './signin'

const router = Router()

router.use('/users', UserRouter)
router.use('/profiles', ProfileRouter)
router.use('/signin', SignInRouter)

export default router
