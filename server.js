const port = process.env.PORT || 8080
const express = require('express') 
const app = express() 
const ip = require("ip")

console.log(' ')
console.log('App running at:')
app.use(express.static('dist'))
app.listen(port, function () {
    console.log(`\x1b[37m- Local:   \x1b[36mhttp://localhost:${port}\x1b[37m`)
    console.log(`\x1b[37m- Network: \x1b[36mhttp://${ip.address()}:${port}\x1b[37m`)
})
console.log(' ')