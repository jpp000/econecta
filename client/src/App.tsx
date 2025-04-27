import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";

import HomeContainer from "./views/Home/HomeContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import LoginContainer from "./views/Login/LoginContainer";
import SignupContainer from "./views/Signup/SignupContainer";
import DonationsContainer from "./views/Donations/DonationsContainer";
import AboutUsContainer from "./views/AboutUs/AboutUsContainer";
import ProfileContainer from "./views/Profile/ProfileContainer";
import CoursesContainer from "./views/Courses/CoursesContainer";
import ChatsContainer from "./views/Chats/ChatsContainer";
import Footer from "./components/Footer/Footer";
import CalendarContainer from "./views/Calendar/CalendarContainer";


const ProtectedRoute = (Component: React.FC) => {
  const token = localStorage.getItem("token");
  const { isAuthenticated } = useAuthStore();

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <Component />;
};

const App = () => {
  const { isLoading, initializeAuth, isAuthenticated } = useAuthStore();

  if (!isLoading && !isAuthenticated) {
    initializeAuth();
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-green-100/60">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <NavbarContainer />

      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <HomeContainer /> : <LoginContainer />
          }
        />
        <Route path="/signup" element={<SignupContainer />} />
        <Route path="/" element={ProtectedRoute(HomeContainer)} />
        <Route path="/donations" element={ProtectedRoute(DonationsContainer)} />
        <Route path="/about" element={ProtectedRoute(AboutUsContainer)} />
        <Route path="/profile" element={ProtectedRoute(ProfileContainer)} />
        <Route path="/courses" element={ProtectedRoute(CoursesContainer)} />
        <Route path="/chats" element={ProtectedRoute(ChatsContainer)} />
        <Route path="/calendar" element={ProtectedRoute(CalendarContainer)} />
      </Routes>

      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
