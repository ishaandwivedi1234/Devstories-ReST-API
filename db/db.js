const mongoose = require('mongoose')

module.exports = function () {
    mongoose.connect('mongodb://localhost/dev_stories', { useUnifiedTopology: true,useNewUrlParser: true })
        .then(() => console.log('Conneted to mongoDb'))
        .catch(err => console.log('cant connect to mongodb'))
}