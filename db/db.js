const mongoose = require('mongoose')

module.exports = function () {
    const url = process.env.MONGODB_URL  || 'mongodb://localhost/dev_stories' ;
    mongoose.connect(url, { useUnifiedTopology: true,useNewUrlParser: true })
        .then(() => console.log('Conneted to mongoDb'))
        .catch(err => console.log('cant connect to mongodb'))
}