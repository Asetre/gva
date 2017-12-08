const Posts = require('./model')

Posts.find({}).sort('-date').limit(5).exec(function(err, posts){
    console.log('posts' + posts)
});
