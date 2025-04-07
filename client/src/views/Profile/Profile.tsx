import { useEffect, useState } from "react"
import {
  User,
  Settings,
  Edit,
  Camera,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Leaf,
  Award,
  BarChart3,
  Clock,
  Sprout,
} from "lucide-react"
import { useNavbarStore } from "@/store/useNavbarStore"
import EditProfileModal from "@/components/EditProfileModal/EditProfileModal" 

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { setVariant } = useNavbarStore()

  useEffect(() => {
    setVariant("light")
  }, [setVariant])

  // Mock data - replace with actual data from your API
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    username: "ecosarah",
    email: "sarah@econecta.com",
    location: "Portland, Oregon",
    joinDate: "January 2023",
    phone: "+1 (555) 123-4567",
    bio: "Environmental activist and sustainability advocate. Working to make our planet greener one step at a time. Passionate about renewable energy and waste reduction.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    coverPhoto:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    stats: {
      projects: 12,
      contributions: 48,
      impact: "High",
      carbonSaved: "2.4 tons",
    },
    badges: [
      { name: "Tree Planter", icon: "🌳", description: "Planted 10+ trees" },
      { name: "Waste Reducer", icon: "♻️", description: "Reduced waste by 50%" },
      { name: "Energy Saver", icon: "⚡", description: "Using 100% renewable energy" },
    ],
    recentActivities: [
      {
        id: 1,
        type: "project",
        title: "Beach Cleanup",
        date: "2 days ago",
        description: "Participated in coastal cleanup removing 50kg of plastic waste",
      },
      {
        id: 2,
        type: "donation",
        title: "Rainforest Alliance",
        date: "1 week ago",
        description: "Donated $100 to support rainforest conservation efforts",
      },
      {
        id: 3,
        type: "achievement",
        title: "Carbon Neutral",
        date: "2 weeks ago",
        description: "Achieved carbon neutrality for the month of April",
      },
    ],
  })

  // Handle profile update
  const handleProfileUpdate = async (data: any) => {
    try {
      // In a real app, you would send this data to your API
      console.log("Updating profile with:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local state with new data
      // In a real app, you might want to refresh the data from the API instead
      setProfileData((prev) => ({
        ...prev,
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        location: data.location,
        bio: data.bio,
        // If new avatar/cover was uploaded, you'd get URLs back from your API
        // and update these fields accordingly
      }))

      // Show success message
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile. Please try again.")
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Bio Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
              <p className="text-gray-600">{profileData.bio}</p>
            </div>

            {/* Stats Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Impact Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
                  <div className="text-green-800  font-bold text-xl">{profileData.stats.projects}</div>
                  <div className="text-gray-600 text-sm">Projects</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
                  <div className="text-green-800 font-bold text-xl">{profileData.stats.contributions}</div>
                  <div className="text-gray-600 text-sm">Contributions</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
                  <div className="text-green-800 font-bold text-xl">{profileData.stats.impact}</div>
                  <div className="text-gray-600 text-sm">Impact Level</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
                  <div className="text-green-800 font-bold text-xl">{profileData.stats.carbonSaved}</div>
                  <div className="text-gray-600 text-sm">Carbon Saved</div>
                </div>
              </div>
            </div>

            {/* Badges Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h3>
              <div className="flex flex-wrap gap-4">
                {profileData.badges.map((badge, index) => (
                  <div key={index} className="flex items-center bg-yellow-50 p-3 rounded-lg">
                    <div className="text-2xl mr-3">{badge.icon}</div>
                    <div>
                      <div className="font-medium text-gray-800">{badge.name}</div>
                      <div className="text-xs text-gray-500">{badge.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {profileData.recentActivities.map((activity) => (
                  <div key={activity.id} className="border-l-4 border-green-500 pl-4 py-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-800">{activity.title}</h4>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{activity.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case "projects":
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">My Projects</h3>
            <p className="text-gray-600">Your projects will appear here.</p>
          </div>
        )
      case "contributions":
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">My Contributions</h3>
            <p className="text-gray-600">Your contributions will appear here.</p>
          </div>
        )
      case "settings":
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h3>
            <p className="text-gray-600">Manage your account settings here.</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with user info */}
      <div className="relative">
        <div
          className="h-100 md:h-64 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${profileData.coverPhoto})` }}
        >
          {/* Cover Photo */}
        </div>

        {/* Profile Info Overlay */}
        <div className="container mx-auto px-4">
          <div className="relative -mt-16 sm:-mt-24 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                {/* Avatar */}
                <div className="relative mb-4 sm:mb-0 sm:mr-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white">
                    <img
                      src={profileData.avatar || "/placeholder.svg"}
                      alt={profileData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-green-700 text-white p-2 rounded-full hover:bg-green-800 transition-colors">
                    <Camera size={16} />
                  </button>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                      <p className="text-gray-500">@{profileData.username}</p>
                    </div>
                    <button
                      onClick={() => setIsEditModalOpen(true)}
                      className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors cursor-pointer"
                    >
                      <Edit size={16} className="mr-2" />
                      Edit Profile
                    </button>
                  </div>

                  {/* User Details */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2 text-gray-400" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2 text-gray-400" />
                      <span>Joined {profileData.joinDate}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail size={16} className="mr-2 text-gray-400" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone size={16} className="mr-2 text-gray-400" />
                      <span>{profileData.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-1 flex overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer mr-2 my-1 ml-1 ${
              activeTab === "overview" ? "bg-green-50 text-green-900" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <User size={16} className="mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer mr-2 my-1 ${
              activeTab === "projects" ? "bg-green-50 text-green-900" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Leaf size={16} className="mr-2" />
            Projects
          </button>
          <button
            onClick={() => setActiveTab("contributions")}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer mr-2 my-1 ${
              activeTab === "contributions" ? "bg-green-50 text-green-900" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Award size={16} className="mr-2" />
            Contributions
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer mr-2 my-1 ${
              activeTab === "settings" ? "bg-green-50 text-green-900" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Settings size={16} className="mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - User Stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Environmental Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <Sprout className="h-5 w-5 text-green-800" />
                    </div>
                    <span className="text-gray-600">Trees Planted</span>
                  </div>
                  <span className="font-semibold text-green-800">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-gray-600">Carbon Offset</span>
                  </div>
                  <span className="font-semibold text-green-800">2.4 tons</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                    <span className="text-gray-600">Volunteer Hours</span>
                  </div>
                  <span className="font-semibold text-green-800">48 hours</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sustainability Goals</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Reduce Carbon Footprint</span>
                    <span className="text-sm font-medium text-gray-700">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-700 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Zero Waste</span>
                    <span className="text-sm font-medium text-gray-700">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-700 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Renewable Energy</span>
                    <span className="text-sm font-medium text-gray-700">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-700 h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tab Content */}
          <div className="lg:col-span-2">{renderTabContent()}</div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profileData={profileData}
        onSave={handleProfileUpdate}
      />
    </div>
  )
}

export default ProfilePage

