"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api/axios"

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
    role: "user",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await api.post("/users/register", formData)
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.message || "Error during registration")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-2">Create Account</h1>
          <p className="text-gray-600 text-sm font-medium">Join AssetManager</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              placeholder="Enter your full name"
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Username</label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              placeholder="Choose a username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Email</label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Password</label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Role</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:border-black focus:ring-1 focus:ring-black"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="user">Regular User</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-bold text-sm hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
