import { Router } from 'express'
import { makeCreateProfile, makeListCustomProfiles, makeListProfiles, makeUpdateProfile } from '../factories/profile'
import { createProfileValidator, updateProfileValidator } from '../presentation/validators'
import { authorizer } from '../utils/middleware/authorizer'

const router = Router()

router.post('/', authorizer, createProfileValidator, async (req, res, next) => {
  const response = await makeCreateProfile().handle(req, res)
  res.statusCode = response.status
  return res.json(response?.body)
})

router.patch('/:id', authorizer, updateProfileValidator, async (req, res, next) => {
  const response = await makeUpdateProfile().handle(req, res)
  res.statusCode = response.status
  return res.json(response?.body)
})

router.get('/', authorizer, async (req, res, next) => {
  const response = await makeListProfiles().handle(req, res)
  res.statusCode = response.status
  return res.json(response?.body)
})

router.get('/custom', authorizer, async (req, res, next) => {
  const response = await makeListCustomProfiles().handle(req, res)
  res.statusCode = response.status
  return res.json(response?.body)
})

export default router
