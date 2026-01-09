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
    <nav className="bg-black text-white border-b border-gray-900 px-8 py-5 flex justify-between items-center shadow-sm">
      <div className="flex gap-10 items-center">
        <Link to="/dashboard" className="font-bold text-lg tracking-tight">
          AssetManager
        </Link>
        <div className="flex gap-8">
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition text-sm font-medium">
            Dashboard
          </Link>
          {role === "admin" && (
            <Link to="/create" className="text-gray-300 hover:text-white transition text-sm font-medium">
              Add Asset
            </Link>
          )}
        </div>
      </div>
      <button onClick={handleLogout} className="bg-white text-black hover:bg-gray-100 font-semibold text-sm px-4 py-2">
        Logout
      </button>
    </nav>
  )
}
