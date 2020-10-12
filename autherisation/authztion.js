const Jwt = require('jsonwebtoken')
module.exports = function  (req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('acess denied')
    try {
        const decoded = Jwt.verify(token,'privatekey')
        req.user = decoded
        next();
    } catch (ex) {
         res.status(400).send("Invalid Token..");
        console.log('something failed with autherisation : ' + ex.message)
    }
}