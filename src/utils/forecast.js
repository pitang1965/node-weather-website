const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = process.env.DARKSKY_NET_API_KEY + latitude + ',' + longitude + '?lang=ja&units=si'  // 秘密です

    request ( { url, json: true }, (error, { body }) => {
        if (error) {
            callback ('天気サービスに接続できません。'.undefined)
        } else if (body.error) {
            callback('その地域の天気情報を得ることができません。', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.summary,
                temperatureMin: body.daily.data[0].temperatureMin.toFixed(0),
                temperatureMax: body.daily.data[0].temperatureMax.toFixed(0),
                temperatureCurrent: body.currently.temperature.toFixed(1),
                probability: (body.currently.precipProbability * 100).toFixed(0)
            })
        }
    })
}

module.exports = forecast