import { useState } from "react"
import ContactsList from "../../components/Chat/ContactsList"
import ChatHeader from "../../components/Chat/ChatHeader"
import MessageArea from "../../components/Chat/MessageArea"
import MessageInput from "../../components/Chat/MessageInput" 

function App() {
  const [activeChat, setActiveChat] = useState(null)
  const [messages, setMessages] = useState({
    public: [
      { id: 1, sender: "Jane Doe", content: "Hello everyone!", timestamp: "10:30 AM", isPublic: true },
      { id: 2, sender: "You", content: "Welcome to the public chat!", timestamp: "10:32 AM", isPublic: true },
    ],
    "Emma Thompson": [
      { id: 1, sender: "Emma Thompson", content: "Hi there!", timestamp: "09:45 AM", isPublic: false },
      { id: 2, sender: "You", content: "Hello Emma, how are you?", timestamp: "09:47 AM", isPublic: false },
    ],
    "Jane Doe": [
      { id: 1, sender: "Jane Doe", content: "Can you help me with something?", timestamp: "11:20 AM", isPublic: false },
      { id: 2, sender: "You", content: "Sure, what do you need?", timestamp: "11:22 AM", isPublic: false },
    ],
  })
  const [editingMessage, setEditingMessage] = useState<{
    id: number
    sender: string
    content: string
    timestamp: string
    isPublic: boolean
    edited?: boolean
  } | null>(null)

  const handleSendMessage = (content : any) => {
    if (editingMessage) {
      // Edit existing message
      const chatKey = activeChat || "public"
      setMessages({
        ...messages,
        [chatKey]: messages[chatKey].map((msg) =>
          msg.id === editingMessage.id ? { ...msg, content, edited: true } : msg,
        ),
      })
      setEditingMessage(null)
    } else {
      // Send new message
      const newMessage = {
        id: Date.now(),
        sender: "You",
        content,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isPublic: activeChat === null,
      }

      const chatKey = activeChat || "public"
      setMessages({
        ...messages,
        [chatKey]: [...(messages[chatKey] || []), newMessage],
      })
    }
  }

  const handleEditMessage = (message :any) => {
    setEditingMessage(message)
  }

  const handleDeleteMessage = (messageId : any) => {
    const chatKey = activeChat || "public"
    setMessages({
      ...messages,
      [chatKey]: messages[chatKey].filter((msg) => msg.id !== messageId),
    })
  }

  const handleSelectChat = (contact : any) => {
    setActiveChat(contact)
    setEditingMessage(null)
  }

  return (
    <div className="flex h-[89vh] mt-16 bg-[#1E3A3A] text-gray-200">
      <ContactsList activeChat={activeChat} onSelectChat={handleSelectChat} />
      <div className="flex flex-col flex-1 border-l border-gray-700">
        <ChatHeader activeChat={activeChat} />
        <MessageArea
          messages={activeChat ? messages[activeChat] || [] : messages.public}
          onEditMessage={handleEditMessage}
          onDeleteMessage={handleDeleteMessage}
        />
        <MessageInput
          onSendMessage={handleSendMessage}
          editingMessage={editingMessage}
          setEditingMessage={setEditingMessage}
        />
      </div>
    </div>
  )
}

export default App
