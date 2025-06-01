import type React from "react"
import { useState, useRef } from "react"
import { Send, X } from "lucide-react"
import { ChatUser, Message } from "@/interfaces/message.interface"
import { useChatStore } from "@/store/useChatStore"

interface MessageInputProps {
  onSendMessage: (text: string, receiver: ChatUser | null) => void
  editingMessage: Message | null
  setEditingMessage: (message: Message | null) => void
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, editingMessage, setEditingMessage }) => {
  const [message, setMessage] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)
  const { selectedChat } = useChatStore()

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim(), selectedChat)
      setMessage("")
    }
  }

  const cancelEditing = (): void => {
    setEditingMessage(null)
    setMessage("")
  }

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      {editingMessage && (
        <div className="flex items-center justify-between mb-2 px-3 py-2 bg-green-50 rounded text-sm border-l-4 border-green-500 animate-fadeIn">
          <span className="text-gray-700">
            <span className="text-green-600 font-semibold">Editando Messagem:</span>{" "}
            {editingMessage.text.substring(0, 50)}
            {editingMessage.text.length > 50 ? "..." : ""}
          </span>
          <button
            onClick={cancelEditing}
            className="text-gray-500 hover:text-gray-700 ml-2 p-1 rounded-full hover:bg-green-100 transition-colors duration-200"
          >
            <X size={16} />
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-center bg-gray-100 rounded-full px-3 py-1 shadow-sm">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite a mensagem..."
          className="flex-1 bg-transparent text-gray-800 px-3 py-2 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className={`p-2 rounded-full transition-all duration-200 ${message.trim()
            ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}

export default MessageInput
