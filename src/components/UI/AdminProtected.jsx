import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminProtectedRoute= () => {
    const { isAuthenticated, loading } = useSelector((state) => state.admin)

    if (loading) {
        return 'Loading...'
    }
    if (!isAuthenticated) {
        return <Navigate to={'/admin/login'} replace />
    }

    return <Outlet />
}

export default AdminProtectedRoute