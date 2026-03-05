import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import StatsCard from '@/components/StatsCard';
import { FileText, MessageSquare, Send, Clock, Bell, Calendar, CheckCircle, Users, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';

const StudentDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold font-display">Student Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Active Notices" value={12} icon={<FileText className="h-6 w-6" />} />
        <StatsCard title="My Complaints" value={3} icon={<MessageSquare className="h-6 w-6" />} />
        <StatsCard title="Pending Requests" value={2} icon={<Send className="h-6 w-6" />} />
        <StatsCard title="Leave Status" value={1} icon={<Clock className="h-6 w-6" />} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Recent Notices</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {['Exam Schedule Released', 'Holiday Announcement', 'Workshop Registration'].map((n, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm">{n}</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">My Submissions</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: 'Hostel complaint', status: 'pending' as const },
              { title: 'Leave request', status: 'approved' as const },
              { title: 'Certificate request', status: 'in-progress' as const },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <p className="font-medium text-sm">{s.title}</p>
                <StatusBadge status={s.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const FacultyDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold font-display">Faculty Dashboard</h1>
        <p className="text-muted-foreground">Manage your department activities.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="New Complaints" value={5} icon={<MessageSquare className="h-6 w-6" />} />
        <StatsCard title="Leave Requests" value={3} icon={<Clock className="h-6 w-6" />} />
        <StatsCard title="Student Requests" value={4} icon={<Send className="h-6 w-6" />} />
        <StatsCard title="Resolved" value={18} icon={<CheckCircle className="h-6 w-6" />} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Pending Actions</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: 'Leave: John Doe - 3 days', status: 'pending' as const },
              { title: 'Complaint: Hostel water issue', status: 'pending' as const },
              { title: 'Request: Lab access', status: 'in-progress' as const },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <p className="font-medium text-sm">{s.title}</p>
                <StatusBadge status={s.status} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Upcoming Events</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {['Mid-term Exams - Mar 15', 'Faculty Meeting - Mar 10', 'Workshop - Mar 20'].map((e, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="h-4 w-4 text-primary" />
                <p className="font-medium text-sm">{e}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold font-display">Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor campus-wide activities.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Complaints" value={24} icon={<MessageSquare className="h-6 w-6" />} />
        <StatsCard title="Active Faculty" value={15} icon={<Users className="h-6 w-6" />} />
        <StatsCard title="Pending Issues" value={8} icon={<BarChart3 className="h-6 w-6" />} />
        <StatsCard title="Resolved Today" value={5} icon={<CheckCircle className="h-6 w-6" />} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Department Overview</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { dept: 'Computer Science', complaints: 8, resolved: 5 },
              { dept: 'Electronics', complaints: 5, resolved: 3 },
              { dept: 'Mechanical', complaints: 6, resolved: 6 },
            ].map((d, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm">{d.dept}</p>
                  <p className="text-xs text-muted-foreground">{d.complaints} complaints, {d.resolved} resolved</p>
                </div>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Forwarded Issues</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: 'Infrastructure issue - Hostel B', status: 'in-progress' as const },
              { title: 'Lab equipment malfunction', status: 'pending' as const },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <p className="font-medium text-sm">{s.title}</p>
                <StatusBadge status={s.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <DashboardLayout>
      {user.role === 'student' && <StudentDashboard />}
      {user.role === 'faculty' && <FacultyDashboard />}
      {user.role === 'admin' && <AdminDashboard />}
    </DashboardLayout>
  );
};

export default Dashboard;
