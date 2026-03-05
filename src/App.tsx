import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Notices from "./pages/Notices";
import SavedNotices from "./pages/SavedNotices";
import CalendarPage from "./pages/CalendarPage";
import ComplaintsRouter from "./pages/ComplaintsRouter";
import RequestsRouter from "./pages/RequestsRouter";
import Leave from "./pages/Leave";
import Feedback from "./pages/Feedback";
import TrackStatus from "./pages/TrackStatus";
import PostNotice from "./pages/PostNotice";
import FacultyComplaints from "./pages/FacultyComplaints";
import FacultyRequests from "./pages/FacultyRequests";
import LeaveApprovals from "./pages/LeaveApprovals";
import ResolvedIssues from "./pages/ResolvedIssues";
import FacultyActivity from "./pages/FacultyActivity";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/notices" element={<ProtectedRoute><Notices /></ProtectedRoute>} />
            <Route path="/dashboard/saved-notices" element={<ProtectedRoute><SavedNotices /></ProtectedRoute>} />
            <Route path="/dashboard/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
            <Route path="/dashboard/complaints" element={<ProtectedRoute><ComplaintsRouter /></ProtectedRoute>} />
            <Route path="/dashboard/requests" element={<ProtectedRoute><RequestsRouter /></ProtectedRoute>} />
            <Route path="/dashboard/leave" element={<ProtectedRoute><Leave /></ProtectedRoute>} />
            <Route path="/dashboard/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
            <Route path="/dashboard/track" element={<ProtectedRoute><TrackStatus /></ProtectedRoute>} />
            <Route path="/dashboard/submissions" element={<ProtectedRoute><TrackStatus /></ProtectedRoute>} />
            <Route path="/dashboard/post-notice" element={<ProtectedRoute><PostNotice /></ProtectedRoute>} />
            <Route path="/dashboard/leave-approvals" element={<ProtectedRoute><LeaveApprovals /></ProtectedRoute>} />
            <Route path="/dashboard/resolved" element={<ProtectedRoute><ResolvedIssues /></ProtectedRoute>} />
            <Route path="/dashboard/faculty-activity" element={<ProtectedRoute><FacultyActivity /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
