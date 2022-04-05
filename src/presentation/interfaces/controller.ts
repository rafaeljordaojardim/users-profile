import { IResponse } from './response'

export interface IController {
  handle: (req, res) => Promise<IResponse>
}
