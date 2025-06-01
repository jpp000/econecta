import ContactsList from "../../components/Chat/ContactsList"
import ChatHeader from "../../components/Chat/ChatHeader"
import MessageArea from "../../components/Chat/MessageArea"
import MessageInput from "../../components/Chat/MessageInput"
import { ChatUser, Message } from "@/interfaces/message.interface";

interface ChatProps {
  activeChat: ChatUser | null;
  messages: Message[];
  handleSendMessage: (text: string, receiver: ChatUser | null) => void;
  handleSelectChat: (chat: ChatUser | null) => void;
  editingMessage: Message | null;
  setEditingMessage: (message: Message | null) => void;
  handleEditMessage?: (message: Message | null) => void;
  handleDeleteMessage?: any;
}

const Chats = ({
  activeChat,
  messages,
  handleSendMessage,
  handleSelectChat,
  handleEditMessage,
  editingMessage,
  setEditingMessage
}: ChatProps) => {
  return (
    <div className="flex h-[calc(100vh-4rem)] mt-16 bg-[#1E3A3A] text-gray-200">
      <ContactsList activeChat={activeChat} onSelectChat={handleSelectChat} />
      <div className="flex flex-1 flex-col border-gray-700">
        <ChatHeader activeChat={activeChat} toggleMobileMenu={function (): void {
          throw new Error("Function not implemented.");
        }} isMobileMenuOpen={false} />
        <MessageArea
          messages={messages}
          onEditMessage={handleEditMessage}
          // onDeleteMessage={handleDeleteMessage}
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

export default Chats;
