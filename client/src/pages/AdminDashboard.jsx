import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom" // Added for navigation
import { ArrowLeft } from "lucide-react" // Added for the back icon

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const AdminDashboard = () => {
  const [pending, setPending] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)
  const navigate = useNavigate() // Initialized navigate

  const loadPending = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API_URL}/admin/pending-users`)
      setPending(res.data.users || [])
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load pending users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPending()
  }, [])

  const approve = async (id) => {
    setActionLoading(id)
    try {
      await axios.post(`${API_URL}/admin/approve/${id}`)
      setPending((list) => list.filter((u) => u._id !== id))
      toast.success("User approved")
    } catch (err) {
      toast.error(err.response?.data?.message || "Approve failed")
    } finally {
      setActionLoading(null)
    }
  }

  const reject = async (id) => {
    // Replaced window.prompt with a more robust modal in a real app
    const reason = window.prompt("Provide a reason for rejection (optional):")
    if (reason === null) return // User cancelled the prompt

    setActionLoading(id)
    try {
      await axios.post(`${API_URL}/admin/reject/${id}`, { reason: reason || undefined })
      setPending((list) => list.filter((u) => u._id !== id))
      toast.success("User rejected")
    } catch (err) {
      toast.error(err.response?.data?.message || "Reject failed")
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto bg-base-100 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          {/* Back button updated here */}
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
        <p className="mb-6 text-base-content/70">Pending registrations requiring approval.</p>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : pending.length === 0 ? (
          <div className="py-12 text-center text-base-content/60">No pending users</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Batch</th>
                  <th>Center</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.batch || "-"}</td>
                    <td>{u.center || "-"}</td>
                    <td className="space-x-2">
                      <button
                        className="btn btn-success btn-sm"
                        disabled={actionLoading === u._id}
                        onClick={() => approve(u._id)}
                      >
                        {actionLoading === u._id ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          "Approve"
                        )}
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        disabled={actionLoading === u._id}
                        onClick={() => reject(u._id)}
                      >
                        {actionLoading === u._id ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          "Reject"
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard

