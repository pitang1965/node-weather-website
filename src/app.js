const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'ピータンの天気予報',
        name: 'pitang1965'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'サイト情報',
        name: 'pitang1965'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'ヘルプ',
        name: 'pitang1965',
        helpText: 'weather?address=新宿 といったURLでJSONを返します。'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: '適切な地域を指定してください。'
        })
    }

    const address = req.query.address

    geocode(address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }


        
    
        forecast(latitude, longtitude, (error, {summary, temperatureMin, temperatureMax, temperatureCurrent, probability}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                address,
                location,
                forecast: 'まず、初めに概況です。' + summary + '今日の最低気温は' + temperatureMin + '℃、最高気温は' + temperatureMax + '℃です。現在の気温は' + temperatureCurrent + '℃、降水確率は' + probability +' %です。'
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'ヘルプ',
        name: 'ピータン1965',
        errorMessage: 'お探しのヘルプは見つかりませんでした。'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        name: 'ピータン1965',
        errorMessage: 'お探しのページは見つかりませんでした。'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})