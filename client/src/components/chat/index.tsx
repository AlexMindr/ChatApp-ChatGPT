import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
  ChatHeaderProps,
  MessageFormProps,
} from "react-chat-engine-advanced";
import Header from "@/components/customHeader";
import StandardMessageForm from "@/components/customMessageForms/StandardMessageForm";

const Chat = () => {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    "testuser",
    "1234"
  );

  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat: ChatHeaderProps) => <Header chat={chat} />}
        renderMessageForm={(props: MessageFormProps) => {
          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
};

export default Chat;
