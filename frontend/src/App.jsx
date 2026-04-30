import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AccessibilityToolbar from "./components/AccessibilityToolbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./page/LandingPage";
import AIBuilder from "./pages/AIBuilder";
import CourseDetail from "./pages/CourseDetail";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import { Login, Register } from "./pages/AuthPages";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/ai-builder" element={<ProtectedRoute><AIBuilder /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <AccessibilityToolbar />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AccessibilityProvider>
          <AppRoutes />
        </AccessibilityProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
