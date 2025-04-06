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
import Calendar from "./views/Calendar/Calendar";
import Footer from "./components/Footer/Footer";
import { useEffect } from "react";

const App = () => {
  const { isLoading, checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

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
          element={isAuthenticated ? <Navigate to="/" /> : <LoginContainer />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <SignupContainer />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <HomeContainer /> : <Navigate to="/login" />}
        />
        <Route
          path="/donations"
          element={isAuthenticated ? <DonationsContainer /> : <LoginContainer />}
        />
        <Route
          path="/about"
          element={isAuthenticated ? <AboutUsContainer /> : <LoginContainer />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <ProfileContainer /> : <LoginContainer />}
        />
        <Route
          path="/courses"
          element={isAuthenticated ? <CoursesContainer /> : <LoginContainer />}
        />
        <Route
          path="/chats"
          element={isAuthenticated ? <ChatsContainer /> : <LoginContainer />}
        />
        <Route
          path="/calendar"
          element={isAuthenticated ? <Calendar /> : <LoginContainer />}
        />
      </Routes>

      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
