require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user_info')
const cors = require('cors')
//express app
const app = express()
app.use(cors())
//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/', userRoutes)

//connect to db
//mnnnn
mongoose.connect(process.env.MONG_URI)
    .then(() => {
    app.listen(process.env.PORT,() => {
        console.log('connected to db listening at port 4000!')
    })
    })
    .catch((error) => {
    console.log(error)
    })

