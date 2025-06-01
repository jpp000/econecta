import type React from "react"
import { Menu, X } from "lucide-react"
import { ChatUser } from "@/interfaces/message.interface"

interface ChatHeaderProps {
  activeChat: ChatUser | null
  toggleMobileMenu: () => void
  isMobileMenuOpen: boolean
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ activeChat, toggleMobileMenu, isMobileMenuOpen }) => {
  return (
    <div className="flex items-center justify-between p-[14px] border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center">
        <button
          className="md:hidden mr-3 text-green-600 hover:text-green-700 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
          <span className="text-green-600 font-semibold text-xl">{activeChat ? activeChat.username : "Public Chat"}</span>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
