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
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-black mb-2">Create New Asset</h1>
          <p className="text-gray-600 text-sm">Add a new asset to your inventory</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 border border-gray-200 rounded-xl p-8 bg-white">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Asset Name</label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              placeholder="e.g. MacBook Pro M3"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Category</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:border-black focus:ring-1 focus:ring-black"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Documentation">Documentation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Description</label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black resize-none"
              placeholder="Enter description or serial numbers..."
              rows="5"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-black text-white py-3 rounded-lg font-bold text-sm hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Asset"}
            </button>
            <Link
              to="/dashboard"
              className="flex-1 border border-gray-300 text-black py-3 rounded-lg font-bold text-sm text-center hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
