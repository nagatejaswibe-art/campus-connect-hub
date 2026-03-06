import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Lazy load all pages
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Notices = lazy(() => import("./pages/Notices"));
const SavedNotices = lazy(() => import("./pages/SavedNotices"));
const CalendarPage = lazy(() => import("./pages/CalendarPage"));
const ComplaintsRouter = lazy(() => import("./pages/ComplaintsRouter"));
const RequestsRouter = lazy(() => import("./pages/RequestsRouter"));
const Leave = lazy(() => import("./pages/Leave"));
const Feedback = lazy(() => import("./pages/Feedback"));
const TrackStatus = lazy(() => import("./pages/TrackStatus"));
const PostNotice = lazy(() => import("./pages/PostNotice"));
const LeaveApprovals = lazy(() => import("./pages/LeaveApprovals"));
const ResolvedIssues = lazy(() => import("./pages/ResolvedIssues"));
const FacultyActivity = lazy(() => import("./pages/FacultyActivity"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Submissions = lazy(() => import("./pages/Submissions"));
const Notifications = lazy(() => import("./pages/Notifications"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard/notices" element={<ProtectedRoute><Notices /></ProtectedRoute>} />
              <Route path="/dashboard/saved-notices" element={<ProtectedRoute><SavedNotices /></ProtectedRoute>} />
              <Route path="/dashboard/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
              <Route path="/dashboard/complaints" element={<ProtectedRoute><ComplaintsRouter /></ProtectedRoute>} />
              <Route path="/dashboard/requests" element={<ProtectedRoute><RequestsRouter /></ProtectedRoute>} />
              <Route path="/dashboard/leave" element={<ProtectedRoute><Leave /></ProtectedRoute>} />
              <Route path="/dashboard/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
              <Route path="/dashboard/track" element={<ProtectedRoute><TrackStatus /></ProtectedRoute>} />
              <Route path="/dashboard/submissions" element={<ProtectedRoute><Submissions /></ProtectedRoute>} />
              <Route path="/dashboard/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/dashboard/post-notice" element={<ProtectedRoute><PostNotice /></ProtectedRoute>} />
              <Route path="/dashboard/leave-approvals" element={<ProtectedRoute><LeaveApprovals /></ProtectedRoute>} />
              <Route path="/dashboard/resolved" element={<ProtectedRoute><ResolvedIssues /></ProtectedRoute>} />
              <Route path="/dashboard/faculty-activity" element={<ProtectedRoute><FacultyActivity /></ProtectedRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
