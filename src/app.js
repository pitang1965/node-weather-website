const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

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
        name: 'ピータン1965'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: '作成者について',
        name: 'ピータン1965'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'ヘルプ',
        name: 'ピータン1965',
        helpText: '私はあなたを助けるでしょう。'
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


        
    
        forecast(latitude, longtitude, (error, {summary, temperature, probability}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                address,
                location,
                forecast: location + ' の天気予報をお伝えします。' + summary + '現在の気温は' + temperature + '℃、降水確率は' + probability +' %です。'
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


app.listen(3000, () => {
    console.log('Server is up on oprt 3000.')
})