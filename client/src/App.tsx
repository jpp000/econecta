import { Navigate, Route, Routes } from "react-router-dom";
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
import Calendar from "./views/Calendar/Calendar";
import Footer from "./components/Footer/Footer";


const App = () => {
  const { isLoading, user } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <NavbarContainer />

      <Routes>
        <Route
          path="/"
          element={user ? <HomeContainer /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginContainer />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignupContainer />}
        />
        <Route
          path="/donations"
          element={user ? <DonationsContainer /> : <LoginContainer />}
        />
        <Route
          path="/profile"
          element={user ? <ProfileContainer /> : <LoginContainer />}
        />
        <Route
          path="/courses"
          element={user ? <CoursesContainer /> : <LoginContainer />}
        />
        <Route
          path="/chats"
          element={user ? <ChatsContainer /> : <LoginContainer />}
        />
        <Route
          path="/calendar"
          element={user ? <Calendar /> : <LoginContainer />}
        />
      </Routes>

      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
