# node-weather-website
Node.jsによる簡単な天気予報Webサイト
Node.jsの学習のために作ったものです。
![天気予報](https://user-images.githubusercontent.com/47315420/93012424-44416200-f5db-11ea-992b-49cf9e40a948.gif)

# DEMO
https://pitang1965-weather-application.herokuapp.com/

# Features
Node.js 及び下記パッケージ/モジュールを使用しています。
* [npm: env-cmd](https://www.npmjs.com/package/env-cmd)
* [Express](http://expressjs.com/)
* [npm: hbs](https://www.npmjs.com/package/hbs)
* [npm: request](https://www.npmjs.com/package/request)
 
# Requirement
以下のAPIアカウントを取得する必要があります。
* [Dark Sky API](https://darksky.net/dev)
* [mapbox](https://www.mapbox.com/)
 
# Installation
ローカルで実行する場合は、config/dev.envファイルを作成し、以下を記述してください。
```
PORT=3000
DARKSKY_NET_API_KEY=https://api.darksky.net/forecast/********************************/
MAPBOX_ACCESS_TOKEN=pk.*******************************************************************.**********************
MAPBOX_GEOCODING_URL=https://api.mapbox.com/geocoding/v5/mapbox.places/
```
package.jsonのdevスクリプトを次のように記述してください。
```
  "scripts": {
    "dev": "env-cmd ./config/dev.env nodemon src/app.js -e js,hbs"
  },
```
そしてターミナルから以下を実行します。 
```
dev run dev
```
 
# Usage
テキストボックスに「横浜市」などと入力して[検索]ボタンをクリックしてください。
 
# Note
npm: env-cmdのバージョンは8.0.2でテストしていますので、次でインストールしてください。
```
npm i env-cmd@8.0.2
```
 
# Author
pitang1965
 
* 作成者
pitang1965

* Website
https://software.pitang1965.com/
 
# License
"node-weather-website" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
