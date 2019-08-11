const request = require('request')

const geocode = (address, callback) => {
    const mapBoxAccessToken = 'pk.eyJ1IjoicGl0YW5nMTk2NSIsImEiOiJjank3NXFlb3Qwa3JtM3FwdDR4NXU5ZmJkIn0.XvsnmRCwb0SABsswuKIjpQ' // 秘密です
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + mapBoxAccessToken + '&limit=1&language=ja'

    request ( {url: url, json: true}, (error, { body }) => {
        if (error) {
            callback('ロケーションサービスに接続できません', undefined)
        } else if (body.features.length === 0) {
            callback('指定した地域の緯度・経度を得ることができません', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode