import { Request, Response, NextFunction } from 'express'
import * as Joi from 'joi'

export function createProfileValidator (req: Request, res: Response, next: NextFunction): any {
  try {
    const schema = Joi.object({
      name: Joi.string().required().error(new Error('name is required')),
      actions: Joi.array().items(Joi.number()).error(new Error('actions array is required'))
    })
    Joi.assert(req.body, schema)
    return next()
  } catch (error) {
    console.error(`Error create profile validator: ${String(error)}`)
    return res.status(400).json({ message: String(error) })
  }
}
