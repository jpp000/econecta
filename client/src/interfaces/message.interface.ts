import { User } from "./user.interface";

export type ChatUser = Pick<User, 'username' | '_id'>

export interface Message {
  _id: string;
  text: string;
  sender: ChatUser;
  receiver?: ChatUser;
}

export interface SendPublicMessagePayload {
  text: string;
}

export interface SendPrivateMessagePayload {
  receiverId: string;
  text: string;
}

export interface EditMessagePayload {
  messageId: string
  text: string
}