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
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-1">Create Account</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Join AssetManager</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1.5">Full Name</label>
            <input
              className="w-full px-3 py-2.5 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
              placeholder="Enter your full name"
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1.5">Username</label>
            <input
              className="w-full px-3 py-2.5 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
              placeholder="Choose a username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1.5">Email</label>
            <input
              className="w-full px-3 py-2.5 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1.5">Password</label>
            <input
              className="w-full px-3 py-2.5 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1.5">Role</label>
            <select
              className="w-full px-3 py-2.5 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="user">Regular User</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-2.5 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-black dark:text-white font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}