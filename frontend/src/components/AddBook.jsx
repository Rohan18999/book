import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const location = useLocation()
  const message = location.state?.message

  async function handleForm(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/books",
        { title, author, price },
        { withCredentials: true }
      );

      if (response.status >= 200 && response.status < 300) {
        setTitle("");
        setAuthor("");
        setPrice("");
        navigate("/viewbooks");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }



  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200">

      {/* 🔹 Navbar */}
      <div className="border-b border-gray-800 bg-[#020617]">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-lg font-semibold text-white">
            📚 Book Manager
          </h1>
          {message && (
            <div className="fixed top-6 right-6 z-50">
              <div className="bg-[#020617] border border-green-500/30 text-green-400 px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 backdrop-blur-md">
                
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                
                <span className="text-sm">{message}</span>

              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="text-sm text-red-400 border border-red-500/30 px-4 py-1.5 rounded-lg hover:bg-red-500/10 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🔹 Main */}
      <div className="flex justify-center mt-12 px-4">
        <div className="w-full max-w-lg bg-[#020617] border border-gray-800 rounded-2xl shadow-xl p-8">

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">
              Add New Book
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Add a book to your collection
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleForm} className="flex flex-col gap-5">

            {/* Title */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Title
              </label>
              <input
                type="text"
                placeholder="Clean Code"
                className="w-full px-4 py-2.5 rounded-lg bg-[#0f172a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Author */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Author
              </label>
              <input
                type="text"
                placeholder="Robert C. Martin"
                className="w-full px-4 py-2.5 rounded-lg bg-[#0f172a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Price (₹)
              </label>
              <input
                type="number"
                placeholder="499"
                className="w-full px-4 py-2.5 rounded-lg bg-[#0f172a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            {/* Submit */}
            <button
              disabled={loading}
              className="bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Book"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-[1px] bg-gray-700"></div>
              <span className="text-sm text-gray-500">or</span>
              <div className="flex-1 h-[1px] bg-gray-700"></div>
            </div>

            {/* View Books */}
            <Link to="/viewbooks">
              <button
                type="button"
                className="w-full border border-gray-700 text-gray-300 py-2.5 rounded-lg hover:bg-gray-800 transition"
              >
                View Books
              </button>
            </Link>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBook;