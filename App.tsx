import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import SignupUser from "./pages/auth/SignupUser";
import SignupDoctor from "./pages/auth/SignupDoctor";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import UserDashboard from "./pages/dashboard/UserDashboard";
import SymptomChecker from "./pages/dashboard/SymptomChecker";
import ReportAnalysis from "./pages/dashboard/ReportAnalysis";
import Appointments from "./pages/dashboard/Appointments";
import LabTests from "./pages/dashboard/LabTests";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import DoctorPatients from "./pages/dashboard/DoctorPatients";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminDoctors from "./pages/dashboard/AdminDoctors";
import AdminAnalytics from "./pages/dashboard/AdminAnalytics";
import AdminSettings from "./pages/dashboard/AdminSettings";
import AdminUsers from "./pages/dashboard/AdminUsers";
import FeatureControl from "./pages/dashboard/FeatureControl";
import HealthGenome from "./pages/dashboard/HealthGenome";
import HealthVault from "./pages/dashboard/HealthVault";
import HealthWorld from "./pages/dashboard/HealthWorld";
import Messaging from "./pages/dashboard/Messaging";
import VideoConsultation from "./pages/dashboard/VideoConsultation";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup/user" element={<SignupUser />} />
            <Route path="/signup/doctor" element={<SignupDoctor />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />

            {/* User Panel */}
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["patient"]}><DashboardLayout role="user" /></ProtectedRoute>}>
              <Route index element={<UserDashboard />} />
              <Route path="symptoms" element={<SymptomChecker />} />
              <Route path="reports" element={<ReportAnalysis />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="labs" element={<LabTests />} />
              <Route path="genome" element={<HealthGenome />} />
              <Route path="vault" element={<HealthVault />} />
              <Route path="world" element={<HealthWorld />} />
              <Route path="messages" element={<Messaging />} />
              <Route path="video-consultation" element={<VideoConsultation />} />
            </Route>

            {/* Doctor Panel */}
            <Route path="/doctor" element={<ProtectedRoute allowedRoles={["doctor"]}><DashboardLayout role="doctor" /></ProtectedRoute>}>
              <Route index element={<DoctorDashboard />} />
              <Route path="patients" element={<DoctorPatients />} />
              <Route path="messages" element={<Messaging />} />
              <Route path="video-consultation" element={<VideoConsultation />} />
            </Route>

            {/* Admin Panel */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><DashboardLayout role="admin" /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="doctors" element={<AdminDoctors />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="features" element={<FeatureControl />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
