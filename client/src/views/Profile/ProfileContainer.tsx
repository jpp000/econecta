import { useAuthStore } from "@/store/useAuthStore";
import Profile from "./Profile";


const ProfileContainer = () => {
  const { user } = useAuthStore()
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const currentDate = new Date().toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })
  return <Profile
    user={user}
    currentTime={currentTime}
    currentDate={currentDate}
  />;
}

export default ProfileContainer;