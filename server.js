const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = express.Router()
const Posts = require('./model')
const bodyParser = require('body-parser')
const path = require('path')

//Config
const PORT = 3000
const DatabaseURL = 'mongodb://test:test@ds133816.mlab.com:33816/gva'

//use global promise instead of mongoose promise
mongoose.Promise = global.Promise

//ejs view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/err_public'));

//public directory
app.use(express.static(path.join(__dirname, 'err_public')))

//Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(router)

/*-----------------------------------
Routes
------------------------------------*/
/* Create React app issue
app.get('*', (req, res) => {
    //Send the html file for all requests, react-router-dom will handle client side routing
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

*/

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/posts', (req, res) => {
    Posts.find({})
    .then(posts => {
    res.render('list', {posts: posts})
    })
    .catch(err => {
        console.log(err)
        res.status(500).send('something went wrong')
    })
})

router.post('/posts/submit', (req, res) => {
    let title = req.body.title
    let email = req.body.email
    let description = req.body.description

    let validateTitle = title.split(' ').join('')

    try {
        //Validate string length
        if(title.length > 255) throw postsError('Title is too long, maximum 255 characters allowed.')
        if(validateTitle.length = 0) throw postsError('Title cannot be empty')
        //Validate email
        if(!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            //If email is not valid throw an error
            throw new postsError('Invalid email')
        }

        //Save to database
        Posts.create({
            title: title,
            email: email,
            description: description,
            date: Date.now()
        }, (err, post) => {
            //error saving to database
            if(err) {
                res.status(500).send('something went wrong')
                throw new postsError('Failed to save to database')
            }
            return res.status(200).send('Post saved')
        })

    }catch(err) {
        console.log(err)
        return res.send(err)
    }
})

//Custom error
function postsError(msg) {
    this.msg = msg
    this.type = 'Posts Route Error'
}

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
