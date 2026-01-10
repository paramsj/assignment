"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api/axios"

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const res = await api.post("/users/login", formData)
      localStorage.setItem("userRole", res.data.data.role)
      localStorage.setItem("userName", res.data.data.user)
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-1">AssetManager</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Sign in to your account</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1.5">Username</label>
            <input
              className="w-full px-3 py-2.5 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
              placeholder="Enter username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-1.5">Password</label>
            <input
              className="w-full px-3 py-2.5 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-2.5 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Sign In
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-black dark:text-white font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}