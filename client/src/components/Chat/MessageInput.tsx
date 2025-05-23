import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Send, X } from "lucide-react"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
  isPublic: boolean
  edited?: boolean
}

interface MessageInputProps {
  onSendMessage: (content: string) => void
  editingMessage: Message | null
  setEditingMessage: React.Dispatch<React.SetStateAction<Message | null>>
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, editingMessage, setEditingMessage }) => {
  const [message, setMessage] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editingMessage) {
      setMessage(editingMessage.content)
      inputRef.current?.focus()
    }
  }, [editingMessage])

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim())
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
            <span className="text-green-600 font-semibold">Editing message:</span>{" "}
            {editingMessage.content.substring(0, 50)}
            {editingMessage.content.length > 50 ? "..." : ""}
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
          placeholder="Type a message..."
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
