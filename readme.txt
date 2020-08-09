Log4jsの設定追加

TypeScript+Expressのベースにloggerを追加する

【作成するディレクトリ構成】
project
  dist
  src
    app_modules
    routes

app_modules：アプリケーションの共通処理を作成

【作成手順】

１．log4jsを追加
yarn add log4js

TypeScript用のモジュールはあるので、インストールはlog4jsだけでOK

２．logger.jsを追加
設定はFileAppenderを追加

３．プログラムから呼び出す


