import React from 'react'
import { useAuth } from './context/authContext'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {

  const { isAuthenticated, loading } = useAuth()

  if (loading) return <h1 className='m-auto'>
    Loading...
  </h1>

  if (!loading && !isAuthenticated) return <Navigate to={'/login'} replace />
  if (!isAuthenticated) return <Navigate to={"login"} replace />
  return (
    <Outlet />
  )
}

export default ProtectedRoute