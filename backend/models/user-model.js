const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    books : [
        {
            type: mongoose.Schema.ObjectId,
            ref: "book"
        }
    ]

})

module.exports = mongoose.model("user", userSchema)