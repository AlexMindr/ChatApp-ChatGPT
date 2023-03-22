import { useDebounce } from "@/hooks/debounce";
import { MessageProps } from "@/shared/types";
import { usePostAiAssistMutation } from "@/state/api";
import React, { useEffect, useState } from "react";
import { AttachmentObject } from "react-chat-engine-advanced";
import MessageFormUI from "./MessageFormUI";

const AiAssist = ({ props, activeChat }: MessageProps) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [triggerAssist, resultAssist] = usePostAiAssistMutation();
  const [appendText, setAppendText] = useState("");

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
    setMessage("");
    setAttachment(null);
  };

  const debouncedValue = useDebounce(message, 1000);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    //handle enter and tab
    if (["Enter", "NumpadEnter"].includes(e.key) || e.key === "Tab") {
      e.preventDefault();
      setMessage(`${message} ${appendText}`);
    }
    setAppendText("");
  };

  useEffect(() => {
    if (debouncedValue) {
      const form = { text: message };
      triggerAssist(form);
    }
  }, [debouncedValue]); //eslint-disable-line

  useEffect(() => {
    if (resultAssist.data?.text) {
      setAppendText(resultAssist.data?.text);
    }
  }, [resultAssist]); //eslint-disable-line

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      handleChange={handleChange}
      message={message}
      handleSubmit={handleSubmit}
      appendText={appendText}
      handleKeyDown={handleKeyDown}
    />
  );
};

export default AiAssist;
