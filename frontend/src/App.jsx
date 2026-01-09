import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateAsset from './pages/CreateAsset';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

const Layout = ({ children }) => (
    <>
        <Navbar />
        <main>{children}</main>
    </>
);

function App() {
    return (
        <BrowserRouter>
            <Routes>
               
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                
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

               
                <Route 
                    path="/create" 
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <Layout>
                                <CreateAsset />
                            </Layout>
                        </ProtectedRoute>
                    } 
                />

                
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<div className="p-10 text-center">404 - Page Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;