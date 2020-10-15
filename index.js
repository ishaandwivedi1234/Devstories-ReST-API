const express = require('express')
const app = express();
const home = require('./routes/home')
const auth = require('./routes/auth')
const posts = require('./routes/posts')
require('./db/db')()

app.use(express.json())
app.use('/', home)
app.use('/api', home)
app.use('/api', auth)
app.use('/api/post',posts)


// port information and enviroment variables
const port = process.env.PORT || 3000;

app.listen(port,()=>console.log(`Listning to port ${port}`))