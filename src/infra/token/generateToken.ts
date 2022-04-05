import { IGenerateTokenRepo } from '../../data/interfaces/'
import jwt from 'jsonwebtoken'

export class GenerateTokenRepo implements IGenerateTokenRepo {
  private readonly secret = (process.env.JWT_SECRET_KEY != null) ? process.env.JWT_SECRET_KEY : '123456'
  public generate (email: string, data: any): string {
    return jwt.sign({ email, data }, this.secret)
  }

  public verify (token: string): any {
    return jwt.verify(token, this.secret)
  }
}
