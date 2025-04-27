import type React from "react"

interface ChatHeaderProps {
  activeChat: string | null
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ activeChat }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-[#1E3A3A]">
      <div className="flex items-center">
        <span className="text-[#ece94c] font-semibold text-xl">{activeChat ? activeChat : "Public Chat"}</span>
      </div>
    </div>
  )
}

export default ChatHeader
