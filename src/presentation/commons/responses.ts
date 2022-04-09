import { IResponse } from '../interfaces/response'

export const ok = (data?: any): IResponse => {
  return {
    status: 200,
    data
  }
}

export const created = (data?: any): IResponse => {
  return {
    status: 201,
    data
  }
}

export const forbidden = (data?: any): IResponse => {
  return {
    status: 403,
    data
  }
}

export const unauthorized = (data?: any): IResponse => {
  return {
    status: 401,
    data
  }
}

export const serverError = (): IResponse => {
  return {
    status: 500,
    data: { message: 'Server Error' }
  }
}

export const badRequest = (message?: string): IResponse => {
  return {
    status: 400,
    data: { message }
  }
}

export const notFound = (message?: string): IResponse => {
  return {
    status: 404,
    data: { message }
  }
}

export const noContent = (message?: string): IResponse => {
  return {
    status: 204,
    data: { message }
  }
}

export const conflict = (message?: string): IResponse => {
  return {
    status: 409,
    data: { message }
  }
}
