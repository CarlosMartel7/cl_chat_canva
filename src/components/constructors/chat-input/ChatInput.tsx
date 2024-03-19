import React, { Fragment, useRef, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { message } from "../message/Message.types";
import TextArea from "../common/TextArea";

function formatHourMinute(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0"); // Add leading zero if necessary
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Add leading zero if necessary
  return `${hours}:${minutes}`;
}

interface ChatInputProps {
  attachItemFunction: (payload: FileList) => Promise<any>;
  setMessage: React.Dispatch<React.SetStateAction<message[]>>;
  initialSend?: boolean | "read" | "received";
  hasAttached?: boolean;
}

function ChatInput({ attachItemFunction, setMessage, initialSend, hasAttached }: ChatInputProps): JSX.Element {
  const fileRef = useRef<null | HTMLInputElement>(null);
  const [attachValue, setAttachValue] = useState<FileList | null>(null);
  const [textValue, setTextValue] = useState<string>("");

  const [textHeight, setTextHeight] = useState<number>(10);

  const textRef = useRef<null | HTMLTextAreaElement>(null);

  const handleClickAttach = (): void => {
    fileRef.current?.click();
  };

  const handleSetValue = (value: string): void => {
    setTextValue(value);

    if (textRef.current) {
      if (textRef.current.scrollHeight > textRef.current.offsetHeight) {
        setTextHeight(16);
      } else if (textHeight > 10) {
        setTextHeight(10);
      }
    }
  };

  const handleChangeAttach = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const twentyMb = 20000000;

    if (e.target.files) {
      if (e.target.files[0].size <= twentyMb) {
        setAttachValue(e.target.files);
      }
    }
  };

  const handleSendMessage = () => {
    setTextValue("");
    setTextHeight(10);
    setMessage((prev: message[]) => {
      const lastOrder = prev[prev.length - 1].order;

      const newMessage: message = {
        content: textValue,
        format: "text",
        isUser: true,
        order: lastOrder + 1,
        time: formatHourMinute(new Date()),
        sendStatus: initialSend === undefined ? false : initialSend,
      };

      return [...prev, newMessage];
    });
  };

  return (
    <Fragment>
      <div className="absolute bottom-0 bg-stone-300 w-full gap-3 p-6 flex items-center text-chat-secondary max-h-[13vh] max-input-h">
        {hasAttached ? (
          <button className="!outline-none" onClick={handleClickAttach}>
            <AttachFileIcon />
          </button>
        ) : (
          ""
        )}
        <TextArea textRef={textRef} textHeight={textHeight} textValue={textValue} handleSetValue={handleSetValue} />
        <button className="!outline-none" onClick={handleSendMessage}>
          <SendIcon />
        </button>
      </div>

      {hasAttached ? (
          <input className="hidden" type="file" ref={fileRef} onChange={handleChangeAttach} />
        ) : (
          ""
        )}
    </Fragment>
  );
}

export default ChatInput;
