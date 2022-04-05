
export class ForbiddenError extends Error {
  constructor (message = 'Forbidden') {
    super(message)
  }
}

export class NotFoundError extends Error {
  constructor (message = 'Not found') {
    super(message)
  }
}

export class UnauthorizedError extends Error {
  constructor (message = 'Unauthorized') {
    super(message)
  }
}
