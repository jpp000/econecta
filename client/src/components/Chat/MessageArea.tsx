import type React from "react"
import { useRef, useEffect } from "react"
import { Edit2, Trash2, MoreVertical } from "lucide-react"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
  isPublic: boolean
  edited?: boolean
}

interface MessageAreaProps {
  messages: Message[]
  onEditMessage: (message: Message) => void
  onDeleteMessage: (messageId: number) => void
}

const MessageArea: React.FC<MessageAreaProps> = ({ messages, onEditMessage, onDeleteMessage }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      <div className="space-y-4 pb-2">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"} animate-fadeIn`}
            >
              <div
                className={`
                  max-w-[80%] rounded-lg p-3 shadow-sm
                  ${message.sender === "You"
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                  }
                `}
              >
                <div className="flex justify-between items-start mb-1">
                  <span
                    className={`font-semibold text-sm ${message.sender === "You" ? "text-white" : "text-green-600"}`}
                  >
                    {message.sender}
                  </span>
                  <div className="flex items-center ml-2">
                    <span className={`text-xs ${message.sender === "You" ? "text-green-100" : "text-gray-500"}`}>
                      {message.timestamp}
                    </span>

                    {message.sender === "You" && (
                      <div className="relative group ml-2">
                        <button className="text-white hover:text-green-100 transition-colors duration-200">
                          <MoreVertical size={14} />
                        </button>
                        <div className="absolute right-0 mt-1 hidden group-hover:block bg-white rounded shadow-lg z-10 border border-gray-200 overflow-hidden">
                          <button
                            onClick={() => onEditMessage(message)}
                            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors duration-150"
                          >
                            <Edit2 size={14} className="mr-2 text-green-600" />
                            Edit
                          </button>
                          <button
                            onClick={() => onDeleteMessage(message.id)}
                            className="flex items-center px-3 py-2 text-sm text-red-500 hover:bg-gray-100 w-full text-left transition-colors duration-150"
                          >
                            <Trash2 size={14} className="mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <p
                  className={`text-sm break-words leading-relaxed ${message.sender === "You" ? "text-white" : "text-gray-800"}`}
                >
                  {message.content}
                </p>
                {message.edited && (
                  <span
                    className={`text-xs opacity-70 italic mt-1 inline-block ${message.sender === "You" ? "text-green-100" : "text-gray-500"
                      }`}
                  >
                    (edited)
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <p className="text-gray-600 text-sm">No messages yet</p>
              <p className="text-gray-500 text-xs mt-2">Start the conversation by sending a message</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default MessageArea
