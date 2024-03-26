const express = require('express')
const app = express()


//routes

app.get('/', (req, res) => {
    res.send('Hello Social Api')
})

app.listen(3000, ()=> {
    console.log('Social API is running on port 3000')
})