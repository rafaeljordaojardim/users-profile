// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class LoggerThrow {
  public static error (message = 'Algo de errado ocorreu', ErrorClass = Error): void {
    console.error(message)
    throw new ErrorClass(message)
  }

  public static log (message = 'Tudo certo'): void {
    console.log(message)
  }
}
