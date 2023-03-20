import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { ChatObject, MessageFormProps } from "react-chat-engine-advanced";

type Props = {
  props: MessageFormProps;
  activeChat: ChatObject | undefined;
};

const StandardMessageForm = ({ props, activeChat }: Props) => {
  const [message, setMessage] = useState<string>("");
  const [attachment, setAttachment] = useState<string>("");
  const [preview, setPreview] = useState<string>("");

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
      <div>message</div>
    </div>
  );
};

export default StandardMessageForm;
