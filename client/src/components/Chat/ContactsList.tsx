import type React from "react"
import { useState } from "react"
import { Users, X, Search } from "lucide-react"
import { ChatUser } from "@/interfaces/message.interface"
import { useAuthStore } from "@/store/useAuthStore"

interface ContactsListProps {
  activeChat: ChatUser | null
  onSelectChat: (chat: ChatUser | null) => void
}

const ContactsList: React.FC<ContactsListProps> = ({ activeChat, onSelectChat }) => {
  // const [showOnlineOnly, setShowOnlineOnly] = useState<boolean>(false)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const { users: contacts } = useAuthStore()

  const filteredContacts = contacts
    // ?.filter((contact) => (showOnlineOnly ? contact.status === "online" : true))
    ?.filter((contact) => contact.username.toLowerCase().includes(searchTerm.toLowerCase()))

  // const onlineCount = contacts.filter((contact) => contact.status === "online").length

  if (isCollapsed) {
    return (
      <div className="w-16 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-4 min-h-[100vh]">
        <div className="flex flex-col items-center mb-6">
          <button
            onClick={() => setIsCollapsed(false)}
            className="text-green-600 hover:text-green-700 transition-colors duration-200"
          >
            <Users size={24} />
          </button>
          {/* <div className="mt-2 px-2 py-1 bg-green-100 rounded-full">
            <span className="text-xs text-green-600">{onlineCount}</span>
          </div> */}
        </div>
        {filteredContacts?.map((contact) => (
          <div
            key={contact._id}
            className={`relative w-10 h-10 rounded-full mb-3 cursor-pointer overflow-hidden border-2 transition-all duration-200 transform hover:scale-110 ${activeChat === contact ? "border-green-500 shadow-lg shadow-green-100" : "border-transparent"
              }`}
            onClick={() => onSelectChat({ _id: contact._id, username: contact.username })}
          >
            <img src={"/placeholder.svg"} alt={contact.username} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col min-h-[100vh]">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-green-50">
        <div className="flex items-center text-green-600">
          <Users size={20} className="mr-2" />
          <span className="font-semibold">Contacts</span>
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="text-gray-400 hover:text-green-600 transition-colors duration-200 cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      <div className="p-3 border-b border-gray-200 bg-white">
        <div className="relative">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 text-gray-800 rounded-full px-4 py-2 pl-9 focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={14} />
        </div>
        {/* <label className="flex items-center text-sm text-gray-600 mt-2">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={() => setShowOnlineOnly(!showOnlineOnly)}
            className="mr-2 h-4 w-4 text-green-500 rounded focus:ring-green-400 focus:ring-opacity-25 cursor-pointer"
          />
          Show online only
          <span className="ml-1 text-xs">({onlineCount} online)</span>
        </label> */}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="py-2">
          <div
            className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${activeChat === null ? "bg-green-50 border-l-4 border-green-500" : ""
              }`}
            onClick={() => onSelectChat(null)}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold mr-3 shadow-md">
              P
            </div>
            <div>
              <div className="font-semibold text-green-600">Public Chat</div>
              <div className="text-xs text-gray-500">Everyone</div>
            </div>
          </div>

          {filteredContacts?.map((contact) => (
            <div
              key={contact._id}
              className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${activeChat === contact ? "bg-green-50 border-l-4 border-green-500" : ""
                }`}
              onClick={() => onSelectChat({ _id: contact._id, username: contact.username })}
            >
              <div className="relative mr-3">
                <img
                  src={"/placeholder.svg"}
                  alt={contact.username}
                  className="w-10 h-10 rounded-full shadow-sm"
                />
                {/* {contact.status === "online" ? (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                ) : (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></div>
                )} */}
              </div>
              <div>
                <div className="font-semibold text-gray-800">{contact.username}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactsList
