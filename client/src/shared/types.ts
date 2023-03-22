import { ChatObject, MessageFormProps } from "react-chat-engine-advanced";

export interface MessageProps {
  props: MessageFormProps;
  activeChat: ChatObject | undefined;
}
