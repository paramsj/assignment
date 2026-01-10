"use client"

import { useEffect, useState } from "react"
import api from "../api/axios"

export default function Dashboard() {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const role = localStorage.getItem("userRole")
  const userName = localStorage.getItem("userName")

  useEffect(() => {
    fetchAssets()
  }, [])

  const fetchAssets = async () => {
    try {
      const res = await api.get("/assets")
      setAssets(res.data.data)
    } catch (err) {
      console.error("Error fetching assets:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this asset?")) return
    try {
      await api.delete(`/assets/${id}`)
      fetchAssets()
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete asset")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <p className="text-gray-500 dark:text-gray-400">Loading assets...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-black dark:text-white mb-0.5">Available Assets</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome back, <span className="font-medium">{userName}</span>
            </p>
          </div>
          <div className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black rounded text-xs font-medium">
            {role.toUpperCase()}
          </div>
        </div>

        {assets.length === 0 ? (
          <div className="text-center py-16 border border-gray-200 dark:border-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No assets found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assets.map((asset) => (
              <div
                key={asset._id}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-black hover:shadow-md dark:hover:shadow-gray-900 transition-shadow"
              >
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="text-base font-bold text-black dark:text-white">{asset.name}</h3>
                  <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-xs font-medium rounded whitespace-nowrap">
                    {asset.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {asset.content}
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-800">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded ${
                      asset.status === "Available"
                        ? "bg-black dark:bg-white text-white dark:text-black"
                        : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {asset.status}
                  </span>

                  {role === "admin" && (
                    <button
                      onClick={() => handleDelete(asset._id)}
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}