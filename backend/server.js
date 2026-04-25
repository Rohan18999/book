const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const connectDB = require('./config/mongoose-connection.js')
const indexRouter = require('./routes/indexRouter.js')
const app = express()
const cors = require('cors')

// extracts the content present in the env file
require('dotenv').config()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

// connecting to database
connectDB();

// Routes
app.use('/', indexRouter)



app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})