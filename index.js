const express = require('express')
const app = express();
const home = require('./routes/home')
const auth = require('./routes/auth')
const posts = require('./routes/posts')
const comments = require('./routes/comments')
require('./db/db')()

app.use(express.json())
app.use('/', home)
app.use('/api', home)
app.use('/api', auth)
app.use('/api/post', posts)
app.use('/api/comment',comments)


// port information and enviroment variables
const port = process.env.PORT || 3000; 

app.listen(port,()=>console.log(`Listning to port ${port}`))