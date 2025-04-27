import { useEffect, useState } from "react";
import Chats from "./Chats";
import { useNavbarStore } from "@/store/useNavbarStore";

const ChatsContainer = () => {
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

  const { setVariant } = useNavbarStore()

  useEffect(() => {
    setVariant("light")
  }, [setVariant])

  const handleSendMessage = (content: any) => {
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

  const handleEditMessage = (message: any) => {
    setEditingMessage(message)
  }

  const handleDeleteMessage = (messageId: any) => {
    const chatKey = activeChat || "public"
    setMessages({
      ...messages,
      [chatKey]: messages[chatKey].filter((msg) => msg.id !== messageId),
    })
  }

  const handleSelectChat = (contact: any) => {
    setActiveChat(contact)
    setEditingMessage(null)
  }
  return <Chats
    activeChat={activeChat}
    messages={messages}
    editingMessage={editingMessage}
    handleSendMessage={handleSendMessage}
    handleEditMessage={handleEditMessage}
    handleDeleteMessage={handleDeleteMessage}
    handleSelectChat={handleSelectChat}
    setEditingMessage={setEditingMessage} />
}

export default ChatsContainer;