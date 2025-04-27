import type React from "react"
import { Settings, User, LogOut } from "lucide-react"

interface ChatHeaderProps {
  activeChat: string | null
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ activeChat }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-[#1E3A3A]">
      <div className="flex items-center">
        <span className="text-[#ece94c] font-semibold text-xl">{activeChat ? activeChat : "Public Chat"}</span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-[#ece94c] hover:text-amber-300">
          <Settings size={20} />
        </button>
        <button className="text-[#ece94c] hover:text-amber-300">
          <User size={20} />
        </button>
        <button className="text-[#ece94c] hover:text-amber-300">
          <LogOut size={20} />
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
