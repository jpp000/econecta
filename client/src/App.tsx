import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";

import HomeContainer from "./views/Home/HomeContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import LoginContainer from "./views/Login/LoginContainer";
import SignupContainer from "./views/Signup/SignupContainer";
import DonationsContainer from "./views/Donations/DonationsContainer";
import ProfileContainer from "./views/Profile/ProfileContainer";
import CoursesContainer from "./views/Courses/CoursesContainer";
import ChatsContainer from "./views/Chats/ChatsContainer";
import Footer from "./components/Footer/Footer";
import CalendarContainer from "./views/Calendar/CalendarContainer";

import { useEffect, useState } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

const App = () => {
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const init = async () => {
      await initializeAuth();
      setIsInitializing(false);
    };
    init();
  }, [initializeAuth]);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center h-screen bg-green-100/60">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "bg-green-900 text-white",
          duration: 3000,
        }}
      />

      <NavbarContainer />

      <Routes>
        {/* Rotas públicas */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/chats" />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/chats" /> : <LoginContainer />
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/chats" /> : <SignupContainer />
          }
        />
        <Route path="/home" element={<HomeContainer />} />
        <Route path="/donations" element={<DonationsContainer />} />

        {/* Rotas privadas */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileContainer />
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <CalendarContainer />
            </PrivateRoute>
          }
        />
        <Route
          path="/chats"
          element={
            <PrivateRoute>
              <ChatsContainer />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <PrivateRoute>
              <CoursesContainer />
            </PrivateRoute>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
