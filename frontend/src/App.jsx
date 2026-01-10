import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// Pages
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import CreateAsset from "./pages/CreateAsset"

// Components
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/Navbar"

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main className="flex-1 w-full">{children}</main>
  </>
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- PROTECTED ROUTES (All Roles) --- */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* --- ADMIN ONLY ROUTES --- */}
        <Route
          path="/create"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <CreateAsset />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* --- REDIRECTS --- */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<div className="p-10 text-center">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
