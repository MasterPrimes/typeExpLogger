/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import http from 'http'
import express from 'express'
import session from 'express-session'
import createError, { HttpError } from 'http-errors'
import path from 'path'
import { readdirSync } from 'fs'
import routes from './routes'

class App {
  public express: express.Application = express()

  private port = process.env.PORT || 8080

  /**
   * コンストラクタ
   */
  constructor() {
    this.serverInit()
    this.middleWareInit()
    this.routerInit()
  }

  /**
   * サーバ起動処理
   */
  private serverInit(): void {
    // X-Powered-Byヘッダの無効化
    this.express.disable('x-powered-by')
    // サーバーの起動
    const server = new http.Server(this.express)
    server.listen(this.port)
    server.on('error', this.onError)
  }

  /**
   * ミドルウェアの初期化
   */
  private middleWareInit(): void {
    // ejsを使う
    // this.express.set('views', path.join(__dirname, './pages'))
    // this.express.set('view engine', 'ejs')
    this.express.use(express.static(path.join(__dirname, '../public')))

    // express-session
    const key = {
      secret: 'media player',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 180000,
      },
    }
    this.express.use(session(key))
  }

  /**
   * ルータ初期化
   */
  private routerInit(): void {
    this.express.use('/', routes)
    this.express.use(App.notFoundError)
    this.express.use(App.httpErrorHandler)
  }

  /**
   * 通信エラー発生時の処理
   * @param error エラー
   */
  private onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
      throw error
    }

    const bind =
      typeof this.port === 'string' ? `Pipe ${this.port}` : `Port ${this.port}`

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`)
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`)
        process.exit(1)
        break
      default:
        throw error
    }
  }

  private static getBaseName(name: string): string {
    let base = name.substring(name.lastIndexOf('/') + 1)
    if (base.lastIndexOf('.') !== -1) {
      base = base.substring(0, base.lastIndexOf('.'))
    }
    return base
  }

  /**
   * 404エラー処理
   * @param req HTTPリクエスト
   * @param res HTTPレスポンス
   * @param next Next関数
   */
  private static notFoundError(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    res.send(createError(404))
  }

  /**
   * HTTPエラーハンドラー
   * @param err エラーオブジェクト
   * @param req HTTPリクエスト
   * @param res HTTPレスポンス
   * @param next Next関数
   */
  private static httpErrorHandler(
    err: HttpError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.send('error')
  }
}

// アプリケーションインスタンスの作成
export default new App().express
