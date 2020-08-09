import log4js, { Logger } from 'log4js'

log4js.configure({
  appenders: {
    app: {
      type: 'dateFile',
      filename: 'D:/MyDevelop/logger/VectCode/node/typeExpLogger/access.log',
      backups: 10,
      pattern: '-yyyyMMdd',
      layout: {
        type: 'pattern',
        pattern: '%x{utcdate} :  :  %p : %m',
        tokens: {
          utcdate() {
            return new Date().toISOString()
          },
        },
      },
    },
  },
  categories: {
    default: {
      appenders: ['app'],
      level: 'ALL',
    },
  },
})

export class AppLogger {
  private logger: Logger

  public constructor() {
    this.logger = log4js.getLogger()
  }

  public info(str: string): void {
    this.logger.info(str)
  }

  public debug(str: string): void {
    this.logger.debug(str)
  }

  public error(msg: string, err: Error): void {
    this.logger.error(msg, err)
  }

  public warn(msg: string, err: Error): void {
    this.logger.warn(msg, err)
  }

  public trace(msg: string): void {
    this.logger.trace(msg)
  }

  public fatal(msg: string): void {
    this.logger.fatal(msg)
  }
}

const logger: AppLogger = new AppLogger()
export default logger
