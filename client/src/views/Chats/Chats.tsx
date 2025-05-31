import ContactsList from "../../components/Chat/ContactsList"
import ChatHeader from "../../components/Chat/ChatHeader"
import MessageArea from "../../components/Chat/MessageArea"
import MessageInput from "../../components/Chat/MessageInput"

interface ChatProps {
  activeChat: any;
  handleSelectChat: any;
  messages: any;
  handleSendMessage: any;
  handleEditMessage?: any;
  handleDeleteMessage?: any;
  editingMessage?: any;
  setEditingMessage?: any;
}

const Chats = ({
  activeChat,
  messages,
  handleSendMessage,
  handleSelectChat
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
          // onEditMessage={handleEditMessage}
          // onDeleteMessage={handleDeleteMessage}
        />
        <MessageInput
          onSendMessage={handleSendMessage}
          // editingMessage={editingMessage}
          // setEditingMessage={setEditingMessage}
        />
      </div>
    </div>
  )
}

export default Chats;
