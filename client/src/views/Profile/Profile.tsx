import { User, Mail, Calendar, Shield, CheckCircle, Key,Leaf, ArrowRight, Sun } from "lucide-react"

interface ProfileProps { 
  currentDate: any
  currentTime: any
  user: any
}



const Profile = ({
  currentDate,
  currentTime,
  user,
}: ProfileProps) => {





  return (
    <div className="min-h-screen bg-green-100/30 text-white">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 mt-15">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
          {/* Left Column - User Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              {/* User Avatar and Basic Info */}
              <div className="p-6 text-center border-b border-gray-200">
                <div className="mx-auto h-28 w-28 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white mb-4 shadow-sm">
                  <User className="h-14 w-14 text-gray-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{user?.username}</h2>
                <p className="text-gray-600 mt-1">@{user?.username}</p>

                
                
              </div>

              {/* Account Status */}
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-md font-semibold mb-3 flex items-center text-gray-800">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Account Status
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-gray-700">{"Active"}</span>
                  </div>
                  <span className="text-sm text-green-600">Verified</span>
                </div>
              </div>

              {/* Account Dates */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Joined</span>
                  </div>
                  <span className="text-gray-700">{currentDate || "N/A"}</span>
                </div>

                
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">Last Login</span>
                    </div>
                    <span className="text-gray-700">{currentTime}</span>
                  </div>
                
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-xl overflow-hidden mt-6 shadow-md">
              <div className="p-5">
                <h3 className="text-md font-semibold mb-3 flex items-center text-gray-800">
                  <Key className="h-5 w-5 mr-2 text-green-600" />
                  Security
                </h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Password</p>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-700">••••••••••</p>
                        <button
                        onClick={() => alert("Password reset functionality coming soon!")}
                        className="text-xs bg-[#f8e71c] text-gray-800 py-1 px-3 rounded-full transition-colors hover:bg-[#e6d618] flex items-center"
                        >
                        Reset
                        <ArrowRight className="h-3 w-3 ml-1" />
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - User Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl overflow-hidden h-full flex flex-col shadow-md">
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Were Sustainability meets Style.</h3>
                <p className="text-gray-600 text-sm mb-4">
                  With green designs and recycling, we're making the world eco-friendly.
                </p>

                <div className="mt-4 mb-6">
                  <a href="#" className="text-green-600 hover:text-green-700 text-sm underline">
                    Discover Our Services
                  </a>
                </div>

                <div className="bg-green-900/60 rounded-lg p-5 mb-4 text-white">
                  <h4 className="text-md font-semibold mb-3 flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-[#f8e71c]" />
                    Contact Information
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-300 mb-1">Email Address</p>
                      <p className="text-white">{user?.email}</p>
                    </div>

                    
                      <div>
                        <p className="text-sm text-gray-300 mb-1">Location</p>
                        <p className="text-white">{"N/A"}</p>
                      </div>
                    
                  </div>
                </div>

                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <div className="flex justify-center mb-3">
                    <div className="h-12 w-12 rounded-full bg-[#f8e71c] flex items-center justify-center">
                      <Sun className="h-6 w-6 text-gray-800" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2 text-gray-800">Efficient profile management</h3>
                  <p className="text-gray-600 text-center text-sm">
                    Our tools deliver maximum efficiency, ensuring you get the most out of your account.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white mt-auto border-t border-gray-200">
                <button className="w-full bg-white text-gray-800  py-2 px-4 rounded-full flex items-center justify-center hover:bg-[#e6d618] transition-colors border border-gray-200">
                  Lets start
                  <span className="ml-2 bg-gray-800 rounded-full p-1">
                    <ArrowRight className="h-3 w-3 text-[#f8e71c]" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Account Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl overflow-hidden h-full flex flex-col shadow-md">
              <div className="p-6 flex-grow">
                <div className="flex justify-center mb-4">
                <div className="relative">
              <div className="absolute inset-0 bg-[#2F4F4F] rounded-full opacity-20 transition-opacity blur-md"></div>
              <div className="relative bg-[#2F4F4F] text-white p-2.5 rounded-full">
                <Leaf className="w-5 h-5" strokeWidth={1.5} />
              </div>
            </div>
                </div>

                <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">Efficient account management</h3>

                <div className="bg-green-900/60 rounded-lg p-5 mb-4 text-white">
                  <h4 className="text-md font-semibold mb-3 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-[#f8e71c]" />
                    Account Information
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-300 mb-1">Account Type</p>
                      <p className="text-white">{"Standard"}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-300 mb-1">Status</p>
                      <div className="flex items-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#f8e71c] mr-2"></span>
                        <p className="text-white">{"Active"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/60 rounded-lg p-5 text-white">
                  <h4 className="text-md font-semibold mb-3 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-[#f8e71c]" />
                    Account Details
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-300 mb-1">Member Since</p>
                      <p className="text-white">{"N/A"}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-300 mb-1">Last Login</p>
                      <p className="text-white">{currentTime || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white mt-auto border-t border-gray-200">
                <button className="w-full bg-white text-gray-800 py-2 px-4 rounded-full flex items-center justify-center hover:bg-[#e6d618] transition-colors border border-gray-200">
                  Edit Profile
                  <span className="ml-2 bg-gray-800 rounded-full p-1">
                    <ArrowRight className="h-3 w-3 text-[#f8e71c]" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
