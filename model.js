const mongoose = require('mongoose')
const {Schema} = mongoose

//use global promise instead of mongoose promise
mongoose.Promise = global.Promise

var postsSchema = new Schema({
    title: {type: String, required: true},
    email: {type: String, required: true},
    description: {type: String},
    date: {type: Date, required: true}
})

const Posts = mongoose.model('Posts', postsSchema)

module.exports = Posts
