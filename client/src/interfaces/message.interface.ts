import { User } from "./user.interface";

export type ChatUser = Pick<User, 'username' | '_id'>

export interface Message {
  _id: string;
  text: string;
  sender: ChatUser;
  receiver?: ChatUser;
}

export interface PublicMessagePayload {
  text: string;
}

export interface PrivateMessagePayload {
  receiverId: string;
  text: string;
}
