import { Navigate, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'
import { useAuthStore } from '@/store/authStore'

type Props = {
  children: ReactNode
  role?: 'admin' | 'mozo'
}

export default function ProtectedRoute({ children, role }: Props) {
  const location = useLocation()
  const { isAuthenticated, role: currentRole } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (role && currentRole !== role) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <>{children}</>
}


