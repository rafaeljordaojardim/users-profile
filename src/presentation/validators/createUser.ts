import { Request, Response, NextFunction } from 'express'
import * as Joi from 'joi'

export function createUserValidator (req: Request, res: Response, next: NextFunction): any {
  try {
    const schema = Joi.object({
      firstName: Joi.string().required().error(new Error('firstName is required')),
      lastName: Joi.string().required().error(new Error('lastName is required')),
      email: Joi.string().min(4).max(100).email().required().error(new Error('email is required')),
      password: Joi.string().required().error(new Error('password is required')),
      status: Joi.boolean().default(true),
      bossId: Joi.number().optional(),
      profileId: Joi.number().required(),
      sectorId: Joi.number().required()
    })
    Joi.assert(req.body, schema)
    return next()
  } catch (error) {
    console.error(`Error create user validator: ${String(error)}`)
    return res.status(400).json({ message: String(error) })
  }
}
