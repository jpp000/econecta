import { useEffect } from "react";
import Chats from "./Chats";
import { useNavbarStore } from "@/store/useNavbarStore";
import { ChatUser } from "@/interfaces/message.interface";
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
    getPublicChatMessages
  } = useChatStore();
  const { listContacts } = useAuthStore();
  const { setVariant } = useNavbarStore();

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
    // if (editingMessage) {
    //   const editedMessage = messages?.find((msg) =>
    //     msg._id === editingMessage?._id ? { ...msg, text } : msg
    //   );

    //   setMessages({
    //     ...messages,
    //   });
    //   setEditingMessage(null);
    //   return;
    // }

    if (!text) return;

    return receiver?._id
      ? sendPrivateMessage({ receiverId: receiver._id, text })
      : sendPublicMessage({ text });
  };

  // const handleEditMessage = (message: Message) => {
  //   setEditingMessage(message);
  // };

  // const handleDeleteMessage = (index: number) => {
  //   const updatedMessages = messages.split(index, 1);
  //   setMessages({
  //     ...updatedMessages,
  //   });
  // };

  const handleSelectChat = (chat: ChatUser | null) => {
    setSelectedChat(chat);
    // setEditingMessage(null);
  };

  return (
    <Chats
      activeChat={selectedChat}
      messages={messages}
      // editingMessage={editingMessage}
      handleSendMessage={handleSendMessage}
      // handleEditMessage={handleEditMessage}
      // handleDeleteMessage={handleDeleteMessage}
      handleSelectChat={handleSelectChat}
      // setEditingMessage={setEditingMessage}
    />
  );
};

export default ChatsContainer;
