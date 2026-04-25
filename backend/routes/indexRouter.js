const express = require('express')
const router = express.Router()
const { addBook } = require('../controllers/bookController.js')
const { authUser } = require('../controllers/authController.js')
const { createUser } = require('../controllers/authController.js')
const { viewAllbooks } = require('../controllers/bookController.js')
const { removeUser } = require('../controllers/authController.js')
const isLoggedIn = require('../middlewares/isLoggedIn.js')

router.post('/books', isLoggedIn , addBook)
router.post('/login', authUser)
router.post('/signup', createUser)
router.get('/viewbooks', isLoggedIn, viewAllbooks)
router.post('/logout', removeUser)


// use flash and send the appropirate message

module.exports = router