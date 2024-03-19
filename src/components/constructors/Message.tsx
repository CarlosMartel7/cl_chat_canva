import React, { Fragment } from "react";
import { $message_color, message, saveChangesFunction } from "./message/Message.types";
import { MessageText, MessageAudio, MessageImage, MessageVideo, MessageDeleted } from "./message/Message.formats";

interface MessageProps {
  message: message;
  deletedLabel: string;
  hasEdit: boolean;
  index: number;
  saveChangesFunc: saveChangesFunction
}

function Message({ message, hasEdit, deletedLabel, saveChangesFunc, index }: MessageProps): JSX.Element {
  const { format, isUser } = message;
  const messageColor: $message_color = isUser ? $message_color.HEX_USER : $message_color.HEX_FRIEND;

  if (typeof message !== "object") {
    return <Fragment />;
  }

  return (
    <div className={"max-w-[400px] message-w max-w-400px w-fit flex my-1 " + (isUser ? "ml-auto" : "mr-auto")}>
      {format === "text" ? <MessageText index={index} content={message} saveChangesFunc={saveChangesFunc} isUser={isUser} hasEdit={hasEdit} /> : ""}

      {format === "audio" ? <MessageAudio index={index} content={message} saveChangesFunc={saveChangesFunc} isUser={isUser} /> : ""}

      {format === "image" ? <MessageImage index={index} content={message} saveChangesFunc={saveChangesFunc} isUser={isUser} /> : ""}

      {format === "video" ? <MessageVideo index={index} content={message} saveChangesFunc={saveChangesFunc} isUser={isUser} /> : ""}

      {format === "deleted" ? <MessageDeleted index={index} isUser={isUser} deletedLabel={deletedLabel}/> : ""}
      <span className={`block h-3 w-2 ${isUser ? "order-2" : "order-1"}`}>
        <svg
          viewBox="0 0 8 12"
          height="12"
          width="8"
          preserveAspectRatio="xMidYMid meet"
          version="1.1"
          x="0px"
          y="0px"
          enableBackground="new 0 0 8 12"
        >
          <title>tail-out</title>
          {isUser ? (
            <Fragment>
              <path opacity="0.12" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z" />
              <path fill={`${messageColor}`} d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z" />
            </Fragment>
          ) : (
            <Fragment>
              <path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z" />
              <path fill={`${messageColor}`} d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z" />
            </Fragment>
          )}
        </svg>
      </span>
    </div>
  );
}

export default Message;
