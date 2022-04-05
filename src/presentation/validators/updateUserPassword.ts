import { Request, Response, NextFunction } from 'express'
import * as Joi from 'joi'

export function updateUserPasswordValidator (req: Request, res: Response, next: NextFunction): any {
  try {
    const schema = Joi.object({
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required()
    }).unknown(false)
    Joi.assert(req.body, schema)
    return next()
  } catch (error) {
    console.error(`Error update user password validator: ${String(error)}`)
    return res.status(400).json({ message: String(error) })
  }
}
