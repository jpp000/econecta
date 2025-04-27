"use client"

import { useState, useEffect, useRef } from "react"
import { Send, X, Image } from "lucide-react"

const MessageInput = ({ onSendMessage, editingMessage, setEditingMessage } : any) => {
  const [message, setMessage] = useState("")
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (editingMessage) {
      setMessage(editingMessage.content)
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }, [editingMessage])

  const handleSubmit = (e : any) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const cancelEditing = () => {
    setEditingMessage(null)
    setMessage("")
  }

  return (
    <div className="p-4 border-t border-gray-700 bg-[#1E3A3A]">
      {editingMessage && (
        <div className="flex items-center justify-between mb-2 px-3 py-1 bg-gray-800 rounded text-sm">
          <span className="text-gray-400">Editing message</span>
          <button onClick={cancelEditing} className="text-gray-400 hover:text-white">
            <X size={16} />
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-center">
        <button type="button" className="p-2 text-gray-400 hover:text-gray-200">
          <Image size={20} />
        </button>
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-800 text-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-400"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className={`p-2 ml-2 rounded-full ${
            message.trim() ? "text-[#ece94c] hover:text-amber-300 cursor-pointer" : "text-gray-600 cursor-not-allowed"
          }`}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  )
}

export default MessageInput
