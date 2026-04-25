import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function ViewBooks() {

  const [books, setBooks] = useState([])

  async function bookFunction() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/viewbooks`, {
        withCredentials: true
      })
      setBooks(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    bookFunction()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📚 Your Books</h1>
        <Link to="/">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            Go Back
          </button>
        </Link>
      </div>

      {/* Empty State */}
      {books.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-xl">No books found 📭</p>
        </div>
      )}

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {book.title}
            </h3>

            <p className="text-gray-600 mb-1">
              <span className="font-medium">Author:</span> {book.author}
            </p>

            <p className="text-gray-700 font-bold mt-3">
              ₹{book.price}
            </p>

            {/* Actions */}
            <div className="flex justify-between mt-4">
              <button className="text-sm text-blue-600 hover:underline">
                Edit
              </button>
              <button className="text-sm text-red-500 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default ViewBooks