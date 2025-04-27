"use client"

import { useEffect, useState } from "react"
import { Users, X } from "lucide-react"
import { useNavbarStore } from "@/store/useNavbarStore"

const contacts = [
  { id: 1, name: "Jane Doe", status: "online" },
  { id: 2, name: "Emma Thompson", status: "offline" },
  { id: 3, name: "Olivia Miller", status: "offline" },
  { id: 4, name: "Sophia Davis", status: "offline" },
  { id: 5, name: "Ava Wilson", status: "offline" },
  { id: 6, name: "Isabella Brown", status: "offline" },
  { id: 7, name: "Mia Johnson", status: "offline" },
  { id: 8, name: "Charlotte Williams", status: "offline" },
  { id: 9, name: "Amelia Garcia", status: "offline" },
  { id: 10, name: "James Anderson", status: "offline" },
]

const ContactsList = ({ activeChat, onSelectChat } : any) => {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { setVariant} = useNavbarStore()

  const filteredContacts = showOnlineOnly ? contacts.filter((contact) => contact.status === "online") : contacts

  const onlineCount = contacts.filter((contact) => contact.status === "online").length

  useEffect(() => {
    setVariant("dark")
  }, [setVariant])

  if (isCollapsed) {
    return (
      <div className="w-16 bg-[#1E3A3A] border-r border-gray-700 flex flex-col items-center py-4">
        <button onClick={() => setIsCollapsed(false)} className="text-[#ece94c] hover:text-amber-300 mb-6 cursor-pointer">
          <Users size={24} />
        </button>
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className={`relative w-10 h-10 rounded-full mb-3 cursor-pointer overflow-hidden border-2 ${
              activeChat === contact.name ? "border-amber-400" : "border-transparent"
            }`}
            onClick={() => onSelectChat(contact.name)}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${contact.name.replace(" ", "+")}&background=random`}
              alt={contact.name}
              className="w-full h-full object-cover"
            />
            {contact.status === "online" && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="w-72 bg-[#1E3A3A] border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center text-[#ece94c]">
          <Users size={20} className="mr-2" />
          <span className="font-semibold">Contacts</span>
        </div>
        <button onClick={() => setIsCollapsed(true)} className="text-gray-400 hover:text-gray-200 cursor-pointer">
          <X size={18} />
        </button>
      </div>

      <div className="p-3 border-b border-gray-700">
        <label className="flex items-center text-sm text-gray-400">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={() => setShowOnlineOnly(!showOnlineOnly)}
            className="mr-2 form-checkbox h-4 w-4 text-[#ece94c] rounded focus:ring-amber-400 focus:ring-opacity-25 curso"
          />
          Show online only
          <span className="ml-1 text-xs">({onlineCount} online)</span>
        </label>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="py-2">
          <div
            className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-800 ${
              activeChat === null ? "bg-gray-800" : ""
            }`}
            onClick={() => onSelectChat(null)}
          >
            <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-gray-900 font-bold mr-3">
              P
            </div>
            <div>
              <div className="font-semibold text-[#ece94c]">Public Chat</div>
              <div className="text-xs text-gray-400">Everyone</div>
            </div>
          </div>

          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-800 ${
                activeChat === contact.name ? "bg-gray-800" : ""
              }`}
              onClick={() => onSelectChat(contact.name)}
            >
              <div className="relative mr-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${contact.name.replace(" ", "+")}&background=random`}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full"
                />
                {contact.status === "online" && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                )}
              </div>
              <div>
                <div className="font-semibold text-white/80">{contact.name}</div>
                <div className="text-xs text-gray-400 capitalize">{contact.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactsList
