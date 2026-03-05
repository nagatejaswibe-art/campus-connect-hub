import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Bell, Calendar, FileText, MessageSquare, Send, Clock, Bookmark,
  LogOut, Menu, X, Home, Users, CheckCircle, Forward, Pin, Shield,
  BarChart3, ChevronRight, GraduationCap, BookOpen, Settings,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

const studentNav: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <Home className="h-5 w-5" /> },
  { label: 'Notices', href: '/dashboard/notices', icon: <FileText className="h-5 w-5" /> },
  { label: 'Saved Notices', href: '/dashboard/saved-notices', icon: <Bookmark className="h-5 w-5" /> },
  { label: 'Calendar', href: '/dashboard/calendar', icon: <Calendar className="h-5 w-5" /> },
  { label: 'Complaints', href: '/dashboard/complaints', icon: <MessageSquare className="h-5 w-5" /> },
  { label: 'Requests', href: '/dashboard/requests', icon: <Send className="h-5 w-5" /> },
  { label: 'Leave', href: '/dashboard/leave', icon: <Clock className="h-5 w-5" /> },
  { label: 'Feedback', href: '/dashboard/feedback', icon: <MessageSquare className="h-5 w-5" /> },
  { label: 'Track Status', href: '/dashboard/track', icon: <BarChart3 className="h-5 w-5" /> },
  { label: 'My Submissions', href: '/dashboard/submissions', icon: <FileText className="h-5 w-5" /> },
];

const facultyNav: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <Home className="h-5 w-5" /> },
  { label: 'Post Notice', href: '/dashboard/post-notice', icon: <FileText className="h-5 w-5" /> },
  { label: 'Complaints', href: '/dashboard/complaints', icon: <MessageSquare className="h-5 w-5" /> },
  { label: 'Requests', href: '/dashboard/requests', icon: <Send className="h-5 w-5" /> },
  { label: 'Leave Approvals', href: '/dashboard/leave-approvals', icon: <CheckCircle className="h-5 w-5" /> },
  { label: 'Calendar', href: '/dashboard/calendar', icon: <Calendar className="h-5 w-5" /> },
  { label: 'Resolved Issues', href: '/dashboard/resolved', icon: <CheckCircle className="h-5 w-5" /> },
];

const adminNav: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <Home className="h-5 w-5" /> },
  { label: 'All Complaints', href: '/dashboard/complaints', icon: <MessageSquare className="h-5 w-5" /> },
  { label: 'Faculty Activity', href: '/dashboard/faculty-activity', icon: <Users className="h-5 w-5" /> },
  { label: 'Requests', href: '/dashboard/requests', icon: <Send className="h-5 w-5" /> },
  { label: 'Post Notice', href: '/dashboard/post-notice', icon: <FileText className="h-5 w-5" /> },
  { label: 'Track Progress', href: '/dashboard/track', icon: <BarChart3 className="h-5 w-5" /> },
];

const getNav = (role: UserRole) => {
  if (role === 'faculty') return facultyNav;
  if (role === 'admin') return adminNav;
  return studentNav;
};

const getRoleIcon = (role: UserRole) => {
  if (role === 'faculty') return <BookOpen className="h-5 w-5" />;
  if (role === 'admin') return <Shield className="h-5 w-5" />;
  return <GraduationCap className="h-5 w-5" />;
};

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;
  const navItems = getNav(user.role);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-lg font-bold font-display text-sidebar-foreground">Campus Connect</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-sidebar-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-sidebar-accent flex items-center justify-center">
              {getRoleIcon(user.role)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/60 capitalize">{user.role} {user.department && `• ${user.department}`}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                {item.icon}
                {item.label}
                {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground">
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">3</span>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
