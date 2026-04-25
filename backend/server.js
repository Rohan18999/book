const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const connectDB = require('./config/mongoose-connection.js')
const indexRouter = require('./routes/indexRouter.js')
const app = express()
const cors = require('cors')
const isLoggedIn = require('./middlewares/isLoggedIn.js')

// extracts the content present in the env file
require('dotenv').config()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(cors({
  origin: "https://book-two-olive.vercel.app",
  credentials: true
}))

// connecting to database
connectDB();

// Routes
app.use('/',isLoggedIn, indexRouter)



app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
