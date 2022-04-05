import { IResponse } from '../interfaces/response'

export const ok = (body?: any): IResponse => {
  return {
    status: 200,
    body
  }
}

export const created = (body?: any): IResponse => {
  return {
    status: 201,
    body
  }
}

export const forbidden = (body?: any): IResponse => {
  return {
    status: 403,
    body
  }
}

export const unauthorized = (body?: any): IResponse => {
  return {
    status: 401,
    body
  }
}

export const serverError = (): IResponse => {
  return {
    status: 500,
    body: { message: 'Server Error' }
  }
}

export const badRequest = (message?: string): IResponse => {
  return {
    status: 400,
    body: { message }
  }
}

export const notFound = (message?: string): IResponse => {
  return {
    status: 404,
    body: { message }
  }
}

export const noContent = (message?: string): IResponse => {
  return {
    status: 204,
    body: { message }
  }
}

export const conflict = (message?: string): IResponse => {
  return {
    status: 409,
    body: { message }
  }
}
