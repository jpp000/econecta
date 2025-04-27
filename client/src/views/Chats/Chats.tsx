import ContactsList from "../../components/Chat/ContactsList"
import ChatHeader from "../../components/Chat/ChatHeader"
import MessageArea from "../../components/Chat/MessageArea"
import MessageInput from "../../components/Chat/MessageInput" 

interface ChatProps {
  activeChat : any;
  handleSelectChat : any;
  messages : any;
  handleEditMessage : any;
  handleDeleteMessage : any;
  handleSendMessage : any;
  editingMessage : any;
  setEditingMessage : any;
}

const Chats = ({
  activeChat,
  handleSelectChat,
  messages,
  handleEditMessage,
  handleDeleteMessage,
  handleSendMessage,
  editingMessage,
  setEditingMessage,
}: ChatProps) => { 
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

export default Chats;
