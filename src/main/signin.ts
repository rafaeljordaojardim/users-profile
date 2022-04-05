import { Router } from 'express'
import { makeSignInUser } from '../factories/signin'
import { signInValidator } from '../presentation/validators/signin'

const router = Router()

router.post('/', signInValidator, async (req, res, next) => {
  const response = await makeSignInUser().handle(req, res)
  res.statusCode = response.status
  return res.json(response?.body)
})

export default router
