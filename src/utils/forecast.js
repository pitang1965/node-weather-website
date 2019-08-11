const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f02e0ea71543e42c947355ed7898e4ad/' + latitude + ',' + longitude + '?lang=ja&units=si'  // 秘密です

    request ( { url, json: true }, (error, { body }) => {
        if (error) {
            callback ('天気サービスに接続できません。'.undefined)
        } else if (body.error) {
            callback('その地域の天気情報を得ることができません。', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.summary,
                temperature: body.currently.temperature.toFixed(1),
                probability: (body.currently.precipProbability * 100).toFixed(0)
            })
        }
    })
}

module.exports = forecast