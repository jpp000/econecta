import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

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

const App = () => {
  const loading = false;

  const authUser = true;

  if (loading) {
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
          element={authUser ? <HomeContainer /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <LoginContainer />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignupContainer />}
        />
        <Route
          path="/donations"
          element={authUser ? <DonationsContainer /> : <HomeContainer />}
        />
        <Route
          path="/about"
          element={authUser ? <AboutUsContainer /> : <HomeContainer />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfileContainer /> : <HomeContainer />}
        />
        <Route
          path="/courses"
          element={authUser ? <CoursesContainer /> : <HomeContainer />}
        />
        <Route
          path="/chats"
          element={authUser ? <ChatsContainer /> : <HomeContainer />}
        />
        <Route
          path="/calendar"
          element={authUser ? <Calendar /> : <HomeContainer />}
        />
      </Routes>

      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
