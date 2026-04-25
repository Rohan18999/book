import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { use } from 'react'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        { email, password },
        { withCredentials: true }
      )


      if (response.status === 200) {
        setMessage(response.data.message)
        navigate('/', {
          state: { message: response.data.message }
        })
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login')
      } else if (err.response?.status === 404) {
        navigate('/signup')
      }
      console.error("Login error:", err)
    } finally {
      setLoading(false)
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-[#020617] border border-gray-800 rounded-2xl shadow-xl p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Login to your account
          </p>
        </div>
        <div>
          { message }
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-lg bg-[#0f172a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 rounded-lg bg-[#0f172a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[1px] bg-gray-700"></div>
          <span className="text-sm text-gray-500">or</span>
          <div className="flex-1 h-[1px] bg-gray-700"></div>
        </div>

        {/* Signup */}
        <p className="text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login