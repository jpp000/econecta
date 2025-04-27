"use client"
import { Edit2, Trash2, MoreVertical } from "lucide-react"

const MessageArea = ({ messages, onEditMessage, onDeleteMessage } : any) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-[#1E3A3A]">
      <div className="space-y-4">
        {messages &&
          messages.map((message : any) => (
            <div key={message.id} className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
              <div
                className={`
              max-w-[70%] rounded-lg p-3 
              ${message.sender === "You" ? "bg-[#ece94c] text-gray-800" : "bg-gray-800 text-gray-200"}
            `}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm">{message.sender}</span>
                  <div className="flex items-center ml-2">
                    <span className="text-xs opacity-70">{message.timestamp}</span>

                    {message.sender === "You" && (
                      <div className="relative group ml-2">
                        <button className="text-gray-800 hover:text-gray-800 cursor-pointer">
                          <MoreVertical size={14} />
                        </button>
                        <div className="absolute right-0 mt-1 hidden group-hover:block bg-gray-800 rounded shadow-lg z-10">
                          <button
                            onClick={() => onEditMessage(message)}
                            className="flex items-center px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left cursor-pointer"
                          >
                            <Edit2 size={14} className="mr-2" />
                            Edit
                          </button>
                          <button
                            onClick={() => onDeleteMessage(message.id)}
                            className="flex items-center px-3 py-2 text-sm text-red-400 hover:bg-gray-700 w-full text-left cursor-pointer"
                          >
                            <Trash2 size={14} className="mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm break-words">{message.content}</p>
                {message.edited && <span className="text-xs opacity-70 italic">(edited)</span>}
              </div>
            </div>
          ))}
        {(!messages || messages.length === 0) && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-sm">No messages yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageArea
