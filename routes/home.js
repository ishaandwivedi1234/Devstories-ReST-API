const express = require('express')
const route = express.Router();

route.get('', (req, res) => {
    res.send('Welcome , Yes You ! You Have Landed To Dev Stories Backend Server Page ')
})



module.exports = route
