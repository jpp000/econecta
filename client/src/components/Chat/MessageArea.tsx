import type React from "react";
import { useRef, useEffect, useState } from "react";
import { Message } from "@/interfaces/message.interface";
import { useAuthStore } from "@/store/useAuthStore";

interface MessageAreaProps {
  messages: Message[];
  onEditMessage: (message: Message) => void;
  onDeleteMessage: (messageId: string) => void;
}

const MessageArea: React.FC<MessageAreaProps> = ({
  messages,
  onEditMessage,
  onDeleteMessage,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuthStore();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleMenu = (id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      openMenuId &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      setOpenMenuId(null);
    }
  };

  return (
    <div
      className="flex-1 p-4 overflow-y-auto bg-gray-50"
      onClickCapture={handleClickCapture}
    >
      <div className="space-y-4 pb-2">
        {messages && messages.length > 0 ? (
          messages.map((message) => {
            const isOwnMessage = message.sender._id === user?._id;
            const isOpen = openMenuId === message._id;

            return (
              <div
                key={message._id}
                className={`relative flex ${
                  isOwnMessage ? "justify-end" : "justify-start"
                } animate-fadeIn`}
              >
                <div
                  className={`
                    min-w-30 max-w-130 rounded-lg p-3 shadow-sm relative
                    ${
                      isOwnMessage
                        ? "bg-green-500 text-white rounded-br-none"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                    }
                  `}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className={`font-semibold text-sm ${
                        isOwnMessage ? "text-white" : "text-green-600"
                      }`}
                    >
                      {isOwnMessage ? "Você" : message.sender.username}
                    </span>

                    {isOwnMessage && (
                      <button
                        onClick={() => toggleMenu(message._id)}
                        className="ml-2 text-white opacity-80 hover:opacity-100 cursor-pointer"
                      >
                        ⋯
                      </button>
                    )}
                  </div>

                  <p
                    className={`text-sm break-words leading-relaxed ${
                      isOwnMessage ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {message.text}
                  </p>

                  {isOwnMessage && isOpen && (
                    <div
                      ref={menuRef}
                      className="absolute top-8 right-2 bg-white border border-gray-200 rounded-lg shadow-md z-10 cursor-pointer"
                    >
                      <button
                        onClick={() => {
                          onEditMessage(message);
                          setOpenMenuId(null);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-lg w-full text-left cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          onDeleteMessage(message._id);
                          setOpenMenuId(null);
                        }}
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:rounded-lg w-full text-left cursor-pointer"
                      >
                        Deletar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
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
              <p className="text-gray-600 text-sm">Sem mensagens ainda</p>
              <p className="text-gray-500 text-xs mt-2">
                Começe uma conversa enviando uma mensagem
              </p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageArea;
