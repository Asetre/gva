const mongoose = require('mongoose')
const {Schema} = mongoose

//use golabl promise instead of mongoose promise
mongoose.Promise = global.Promise

var postsSchema = new Schema({
    title: {type: String, required: true},
    email: {type: String, required: true},
    description: {type: Date, required: true}

})

const Posts = mongoose.model('Posts', postsSchema)

module.exports = Posts
