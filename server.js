const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./router/index')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

app.set('view engine', 'ejs');
app.set('views', __dirname + '/Views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', indexRouter)

// Connecting to a database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db  = mongoose.connection
db.once('open', () =>{
    console.log('Connected to DataBase!')
})

// Connecting to server
const port = process.env.PORT || 3000
app.listen(port, () =>{
    console.log(`Listening on port : ${port}`)
})