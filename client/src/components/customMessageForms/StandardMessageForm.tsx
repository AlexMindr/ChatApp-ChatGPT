import {
  AttachmentObject,
  ChatObject,
  MessageFormProps,
} from "react-chat-engine-advanced";
import { useDropzone } from "react-dropzone";
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";

type Props = {
  props: MessageFormProps;
  activeChat: ChatObject | undefined;
};

const StandardMessageForm = ({ props, activeChat }: Props) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | string>("");
  const [preview, setPreview] = useState("");

  const { open, acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    noClick: true,
    accept: {
      "image/jpg": [],
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles) => {
      setAttachment(acceptedFiles[0]);
      setPreview(URL.createObjectURL(acceptedFiles[0]));
    },
  });

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
              id: Math.floor(Math.random() * 1000 + attachment.size),
              created: date,
            },
          ]
        : [];

    if (typeof activeChat === "undefined") return;
    const form = {
      attachments,
      created: date,
      sender_username: props.username!,
      text: message,
      activeChatId: activeChat.id,
      custom_json: {},
    };
    if (typeof props.onSubmit === "undefined") return;
    props.onSubmit(form);
    setMessage("");
    setAttachment("");
  };

  return (
    <div className="message-form-container">
      {preview && (
        <div className="message-form-preview">
          <img
            alt="message form preview"
            className="message-form-preview-image"
            src={preview}
            onLoad={() => URL.revokeObjectURL(preview)}
          />
          <XMarkIcon
            className="message-form-icon-x"
            onClick={() => {
              setPreview("");
              setAttachment("");
            }}
          />
        </div>
      )}
      <div className="message-form">
        <div className="message-form-input-container">
          <input
            className="message-form-input"
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Send a message..."
          />
        </div>
        <div className="message-form-icons">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <PaperClipIcon className="message-form-icon-clip" onClick={open} />
          </div>
          <hr className="vertical-line" />
          <PaperAirplaneIcon
            className="message-form-icon-airplane"
            onClick={() => {
              setPreview("");
              handleSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StandardMessageForm;
