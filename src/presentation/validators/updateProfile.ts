import { Request, Response, NextFunction } from 'express'
import * as Joi from 'joi'

export function updateProfileValidator (req: Request, res: Response, next: NextFunction): any {
  try {
    const schema = Joi.object({
      name: Joi.string().optional().error(new Error('name is required')),
      actions: Joi.array().items(Joi.number()).default([]).error(new Error('actions array is required'))
    })
    Joi.assert(req.body, schema)
    return next()
  } catch (error) {
    console.error(`Error update profile validator: ${String(error)}`)
    return res.status(400).json({ message: String(error) })
  }
}
