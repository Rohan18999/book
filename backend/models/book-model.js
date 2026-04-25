const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    }
})

module.exports = mongoose.model("book", bookSchema)