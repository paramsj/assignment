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

  if (loading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600 text-lg font-medium">Loading assets...</p>
      </div>
    )

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">Available Assets</h1>
            <p className="text-gray-600 text-sm">
              Welcome back, <span className="font-semibold">{userName}</span>
            </p>
          </div>
          <div className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold tracking-wide">
            {role.toUpperCase()}
          </div>
        </div>

        {assets.length === 0 ? (
          <div className="text-center py-20 border border-gray-200 rounded-xl bg-gray-50">
            <p className="text-gray-500 text-lg font-medium">No assets found for your account.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map((asset) => (
              <div
                key={asset._id}
                className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-lg transition flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <h3 className="text-lg font-bold text-black flex-1">{asset.name}</h3>
                    <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs font-semibold rounded whitespace-nowrap">
                      {asset.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm font-medium mb-4 line-clamp-3">{asset.content}</p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      asset.status === "Available" ? "bg-black text-white" : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {asset.status}
                  </span>

                  {role === "admin" && (
                    <button
                      onClick={() => handleDelete(asset._id)}
                      className="text-gray-600 text-xs font-semibold hover:text-red-600 transition"
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
