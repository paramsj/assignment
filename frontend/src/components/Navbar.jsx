"use client"

import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function Navbar() {
  const navigate = useNavigate()
  const role = localStorage.getItem("userRole")

  const handleLogout = async () => {
    try {
      await api.post("/users/logout")
      localStorage.clear()
      navigate("/login")
    } catch (err) {
      localStorage.clear()
      navigate("/login")
    }
  }

  return (
    <nav className="bg-black dark:bg-black border-b border-gray-800 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex gap-8 items-center">
          <Link to="/dashboard" className="font-bold text-white dark:text-white">
            AssetManager
          </Link>
          <div className="flex gap-6">
            <Link
              to="/dashboard"
              className="text-gray-400 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors text-sm font-medium"
            >
              Dashboard
            </Link>
            {role === "admin" && (
              <Link
                to="/create"
                className="text-gray-400 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors text-sm font-medium"
              >
                Add Asset
              </Link>
            )}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white dark:bg-white text-black dark:text-black border border-white dark:border-white font-medium text-sm px-4 py-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-200 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}