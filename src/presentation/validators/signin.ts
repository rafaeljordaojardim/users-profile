import { Request, Response, NextFunction } from 'express'
import * as Joi from 'joi'

export function signInValidator (req: Request, res: Response, next: NextFunction): any {
  try {
    const schema = Joi.object({
      email: Joi.string().required().error(new Error('email is required')),
      password: Joi.string().required().error(new Error('password is required'))
    })
    Joi.assert(req.body, schema)
    return next()
  } catch (error) {
    console.error(`Error singing user validator: ${String(error)}`)
    return res.status(400).json({ message: String(error) })
  }
}
