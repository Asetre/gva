const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 3000
const DatabaseURL = 'mongodb://test:test@ds133816.mlab.com:33816/gva'

//use global promise instead of mongoose promise
mongoose.Promise = global.Promise


function startServer() {
//Connect to server before starting server
    mongoose.connect(DatabaseURL,
        //Options
        {
            useMongoClient: true
        }
    )
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`)
        })
    })
    .catch(err => {
        //Failed to connect to database
        console.log(`Failed to start the server, Error: ${err}`)
    })
}

startServer()
