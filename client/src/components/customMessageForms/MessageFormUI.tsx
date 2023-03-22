import { useDropzone } from "react-dropzone";
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";

type Props = {
  setAttachment: React.Dispatch<React.SetStateAction<File | null>>;
  message: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
  appendText?: string;
  handleKeyDown?: (e: React.KeyboardEvent) => void;
};

const MessageFormUI = ({
  setAttachment,
  message,
  handleChange,
  handleSubmit,
  appendText,
  handleKeyDown,
}: Props) => {
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
              setAttachment(null);
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
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
          />
          {appendText && (
            <input
              className="'message-form-assist"
              type="text"
              disabled
              value={`${message} ${appendText}`}
            />
          )}
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

export default MessageFormUI;
