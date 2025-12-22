import { useEffect, useState } from "react";
import axios from "axios";
import { Check, X, Shield, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppLayout } from "@/components/layout/AppLayout";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user && user.role !== 'admin') {
        navigate('/feed');
        return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [pendingRes, statsRes] = await Promise.all([
        axios.get(`${API_URL}/admin/pending-users`),
        axios.get(`${API_URL}/admin/stats`)
      ]);
      setPendingUsers(pendingRes.data);
      setStats({ total: statsRes.data?.totalUsers || 0, pending: pendingRes.data.length });
    } catch (error) {
      console.error("Error fetching admin data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (userId: string, action: 'approve' | 'reject') => {
    try {
      await axios.post(`${API_URL}/admin/${action}-user/${userId}`);
      
      toast({
        title: action === 'approve' ? "User Approved" : "User Rejected",
        description: `Successfully ${action}ed the user registration.`,
      });

      // Refresh list
      fetchData();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Action Failed",
        description: "Something went wrong.",
      });
    }
  };

  if (loading) return <AppLayout><div className="p-10 text-center">Loading Dashboard...</div></AppLayout>;

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Shield className="w-8 h-8 text-primary" />
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-full text-blue-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
                <h3 className="text-2xl font-bold">{pendingUsers.length}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
             <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-full text-green-600">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <h3 className="text-2xl font-bold">{stats.total || "N/A"}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Users Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Pending Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingUsers.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No pending approvals.</p>
            ) : (
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Center</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pendingUsers.map((u: any) => (
                    <TableRow key={u._id}>
                        <TableCell className="font-medium">{u.name}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>{u.batch}</TableCell>
                        <TableCell>{u.center}</TableCell>
                        <TableCell className="text-right space-x-2">
                        <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleAction(u._id, 'approve')}
                        >
                            <Check className="w-4 h-4 mr-1" /> Approve
                        </Button>
                        <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleAction(u._id, 'reject')}
                        >
                            <X className="w-4 h-4 mr-1" /> Reject
                        </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;