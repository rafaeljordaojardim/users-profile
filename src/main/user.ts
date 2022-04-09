import { Router } from 'express'
import {
  makeCreateUser,
  makeGetUserByEmail,
  makeGetUsers,
  makeUpdateUser,
  makeUpdateUserPassword
} from '../factories/user'
import { createUserValidator, updateUserValidator, updateUserPasswordValidator } from '../presentation/validators'
import { authorizer } from '../utils/middleware/authorizer'

const router = Router()

router.post('/', createUserValidator, async (req, res) => {
  const response = await makeCreateUser().handle(req, res)
  res.statusCode = response.status
  return res.json(response?.data)
})

router.get('/:email', async (req, res) => {
  const response = await makeGetUserByEmail().handle(req, res)
  res.statusCode = response.status
  return res.json(response?.data)
})

router.get('/', authorizer, async (req, res) => {
  const response = await makeGetUsers().handle(req, res)
  res.statusCode = response.status
  return res.json(response?.data)
})

router.patch('/:id', authorizer, updateUserValidator, async (req, res) => {
  const response = await makeUpdateUser().handle(req, res)
  res.statusCode = response.status
  return res.json(response?.data)
})

router.patch('/:id/password', authorizer, updateUserPasswordValidator, async (req, res) => {
  const response = await makeUpdateUserPassword().handle(req, res)
  res.statusCode = response.status
  return res.json(response?.data)
})

export default router
