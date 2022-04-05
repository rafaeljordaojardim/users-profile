import { UnauthorizedError } from '../../data/errors'


export const authorizer = (req, res, next): void => {
  const headers = req.headers
  const apiKey = headers["api-key"];
  try {
    const sysApiKey = process.env.API_KEY || "dev_key"
    if (apiKey != null && apiKey === sysApiKey) {
      return next()
    } else {
      throw new UnauthorizedError('Invalid Api Key')
    }
  } catch (error) {
    console.error(`Error to validate token ${String(error)}`)
    return res.status(401).json({ message: 'Invalid api key' })
  }
}
