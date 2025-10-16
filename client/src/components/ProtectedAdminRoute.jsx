import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useAuthStore()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedAdminRoute

