import { MessageProps } from "@/shared/types";
import { usePostAiCodeMutation } from "@/state/api";
import React, { useState } from "react";
import { AttachmentObject } from "react-chat-engine-advanced";
import MessageFormUI from "./MessageFormUI";

const AiCode = ({ props, activeChat }: MessageProps) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [triggerCode] = usePostAiCodeMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (): Promise<void> => {
    const num = Math.floor(Math.random() * 1000);
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${num}+00:00`);

    const attachments: AttachmentObject[] =
      attachment instanceof File
        ? [
            {
              blob: attachment,
              file: attachment.name,
              id: Math.floor(Math.random() * 100 + attachment.size),
              created: date,
            },
          ]
        : [];

    if (typeof props.onSubmit === "undefined") return;
    if (typeof activeChat === "undefined") return;
    if (attachments.length === 0 && message === "") return;
    const form = {
      attachments,
      created: date,
      sender_username: props.username!,
      text: message ? message : null,
      activeChatId: activeChat.id,
      custom_json: {},
    };
    props.onSubmit(form);
    triggerCode(form);
    setMessage("");
    setAttachment(null);
  };

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      handleChange={handleChange}
      message={message}
      handleSubmit={handleSubmit}
    />
  );
};

export default AiCode;
