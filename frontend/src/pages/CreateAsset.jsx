"use client"

import { useState } from "react"
import api from "../api/axios"
import { useNavigate, Link } from "react-router-dom"

export default function CreateAsset() {
  const [formData, setFormData] = useState({
    name: "",
    category: "Hardware",
    content: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await api.post("/assets", formData)
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create asset")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-black dark:text-white mb-0.5">Create New Asset</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Add a new asset to your inventory</p>
        </div>

        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-black">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1.5">Asset Name</label>
              <input
                className="w-full px-3 py-2.5 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                placeholder="e.g. MacBook Pro M3"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1.5">Category</label>
              <select
                className="w-full px-3 py-2.5 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Documentation">Documentation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1.5">Description</label>
              <textarea
                className="w-full px-3 py-2.5 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none"
                placeholder="Enter description or serial numbers..."
                rows="4"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-black dark:bg-white text-white dark:text-black py-2.5 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Asset"}
              </button>
              <Link
                to="/dashboard"
                className="flex-1 border border-gray-300 dark:border-gray-700 text-black dark:text-white py-2.5 rounded-lg font-medium text-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
