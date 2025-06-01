import { useEffect, useState } from "react";
import Chats from "./Chats";
import { useNavbarStore } from "@/store/useNavbarStore";
import { ChatUser, Message } from "@/interfaces/message.interface";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";

const ChatsContainer = () => {
  const {
    messages,
    sendPrivateMessage,
    sendPublicMessage,
    setSelectedChat,
    selectedChat,
    getPrivateChatMessages,
    getPublicChatMessages,
    editMessage,
  } = useChatStore();
  const { listContacts } = useAuthStore();
  const { setVariant } = useNavbarStore();
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);

  useEffect(() => {
    const getMessages = async () => {
      await listContacts();

      if (selectedChat?._id) {
        await getPrivateChatMessages(selectedChat._id);
        return;
      }

      await getPublicChatMessages();
    };
    getMessages();

    setVariant("light");
  }, [setVariant, listContacts, getPrivateChatMessages, getPublicChatMessages, selectedChat]);

  const handleSendMessage = (text: string, receiver: ChatUser | null) => {
    if (!text) return;

    if (editingMessage) {
      editMessage({ messageId: editingMessage._id, text })
      setEditingMessage(null);
      return;
    }

    return receiver?._id
      ? sendPrivateMessage({ receiverId: receiver._id, text })
      : sendPublicMessage({ text });
  };

  const handleEditMessage = (message: Message | null) => {
    setEditingMessage(message);
  };

  // const handleDeleteMessage = (index: number) => {
  //   const updatedMessages = messages.split(index, 1);
  //   setMessages({
  //     ...updatedMessages,
  //   });
  // };

  const handleSelectChat = (chat: ChatUser | null) => {
    setSelectedChat(chat);
    setEditingMessage(null);
  };

  return (
    <Chats
      activeChat={selectedChat}
      messages={messages}
      handleSendMessage={handleSendMessage}
      handleSelectChat={handleSelectChat}
      editingMessage={editingMessage}
      handleEditMessage={handleEditMessage}
      setEditingMessage={setEditingMessage}
      // handleDeleteMessage={handleDeleteMessage}
    />
  );
};

export default ChatsContainer;
