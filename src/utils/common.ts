import { ForbiddenError, NotFoundError, UnauthorizedError } from '../data/errors'
import { IResponse } from '../presentation/interfaces/response'
import { forbidden, notFound, serverError, unauthorized } from '../presentation/commons/responses'

export const parseToTableFormat = (items: any[]): any => {
  return items?.map((item) => ({
    data: Object.keys(item).map(userKey => {
      const response = {}
      response[userKey] = item[userKey]
      return response
    })
  }))
}

export const makeGetUserQuery = (email?: string): string => {
  const conditionalPart = email != null ? `\nwhere u.email = '${email}' limit 1;` : ''
  const query = `SELECT u.*, 
    pr.name as profile_name, pr.id as profile_id,
    us.first_name as boss_first_name, us.id as boss_id
    FROM users AS u 
    INNER JOIN profiles AS pr ON pr.id = u.profile_id
    LEFT JOIN users AS us ON us.id = u.boss_id ${conditionalPart}`
  return query
}

export const errorProcessor = (error: Error): IResponse => {
  if (error instanceof ForbiddenError) {
    return forbidden({ message: error.message })
  }

  if (error instanceof NotFoundError) {
    return notFound(error.message)
  }

  if (error instanceof UnauthorizedError) {
    return unauthorized({ message: error.message })
  }

  return serverError()
}
