import React from "react";
import { ChatBubbleLeftRightIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { ChatHeaderProps } from "react-chat-engine-advanced";

type Props = {
  chat: ChatHeaderProps;
};

const customHeader = ({ chat }: Props) => {
  return (
    <div className="chat-header">
      <div className="flexbetween">
        <ChatBubbleLeftRightIcon className="icon-chat" />
        <h3 className="header-text">{chat.title}</h3>
      </div>
      <div className="flexbetween">
        <PhoneIcon className="icon-phone" />
        {chat.description !== "⬅️ ⬅️ ⬅️" ? (
          <p className="header-text">{chat.description}</p>
        ) : (
          <p className="header-text">No chat selected</p>
        )}
      </div>
    </div>
  );
};

export default customHeader;
