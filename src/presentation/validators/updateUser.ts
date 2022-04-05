import { Request, Response, NextFunction } from 'express'
import * as Joi from 'joi'

export function updateUserValidator (req: Request, res: Response, next: NextFunction): any {
  try {
    const schema = Joi.object({
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      status: Joi.boolean(),
      bossId: Joi.number().optional(),
      profileId: Joi.number().optional(),
      sectorId: Joi.number().optional()
    }).unknown(false)
    Joi.assert(req.body, schema)
    return next()
  } catch (error) {
    console.error(`Error update user validator: ${String(error)}`)
    return res.status(400).json({ message: String(error) })
  }
}
