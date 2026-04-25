const bookModel = require('../models/book-model.js')
const userModel = require('../models/user-model.js')

module.exports.addBook = async(req, res) => {
    try {
        const {title, author, price} = req.body
        
        if (!title || !author || !price) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const book = await bookModel.create({
            title,
            author,
            price,
            userId: req.user.userId
        })
        const findUser = await userModel.findById(req.user.userId)
        findUser.books.push(book._id)
        await findUser.save()
        // console.log(book)
        return res.status(201).json({
            message: "Book added successfully",
            book
        })
    } catch(err) {
        res.status(500).json({
            message: "Server Side Error"
        })
    }

}

module.exports.viewAllbooks = async(req, res) => {
    try{
        const books = await bookModel.find({ userId: req.user.userId })
        return res.status(200).json(books)
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch the books"})
    }
}