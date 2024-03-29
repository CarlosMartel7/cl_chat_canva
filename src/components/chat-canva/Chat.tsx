import React, { useEffect, useRef, useState } from "react";
import Message from "../constructors/Message";
import { deleteMessageFunction, editChangesFunction, message, sendMessageFunction} from "../constructors/message/Message.types";
import ChatInput from "../constructors/chat-input/ChatInput";
import ChatHeader from "../constructors/chat-header/ChatHeader";
import '../../index.css'
import './styles.css'
import './tailwindCorrections.css'

type user = { userId: string; name: string; photo: string; phone: string }

interface ChatProps {
  devMode: boolean;
  chat: message[];
  user: user;
  friend: user;
  deletedLabel: string;
  editMessageFunction: editChangesFunction;
  deleteMessageFunction: deleteMessageFunction;
  sendMessageFunction: sendMessageFunction;
  hasAttach?: boolean;
  hasEdit?: boolean;
  hasDelete?: boolean;
  initialSend: "pending" | "send" | "read" | "received";
  handleGoBackButton: () => void;
}

function Chat({ devMode, chat, user, friend, deletedLabel, editMessageFunction, deleteMessageFunction, sendMessageFunction, hasAttach, hasDelete, hasEdit, initialSend, handleGoBackButton }: ChatProps): JSX.Element {
  const [messages, setMessages] = useState<message[]>(chat);
  const screenRef = useRef<HTMLDivElement | null>(null)

  const saveChangesFunc = (format: string, content: message, index: number, type: 'deleted' | 'edit'): void=> {
    setMessages((msg: message[]) => {
      let returnedMessages = [...msg]
      if(type === 'deleted'){
        returnedMessages[index] = content
        return returnedMessages
      }

      if (type === 'edit'){
        returnedMessages[index] = content
        return returnedMessages
      }

      return returnedMessages
    });

    if(editMessageFunction && type === 'edit'){
      editMessageFunction(format, content, index);
    }

    if(deleteMessageFunction && type === 'deleted'){
      deleteMessageFunction(index, content)
    }
    
  };

  useEffect(() => {
    if(messages.length != chat.length){
      setMessages(chat)
    }
  }, [chat])

  useEffect(() => {
    if(screenRef.current){
      screenRef.current.scrollTop = screenRef.current.scrollHeight
    }
  }, [messages])

  return (
    <section className="w-full h-full relative overflow-hidden bg-chat-bg">
        <ChatHeader friend={friend} handleGoBackButton={handleGoBackButton}/>
        <div className="w-full h-[80vh] message-area-h h-80vh overflow-y-auto pb-6" id="main-chat" ref={screenRef}>
        {messages.map((thisMessage: message, index: number) => (
          <Message message={thisMessage} index={index} deletedLabel={deletedLabel} saveChangesFunc={saveChangesFunc} key={thisMessage.order} hasDelete={hasDelete != undefined ? hasDelete : true}  hasEdit={hasEdit != undefined ? hasEdit : true} />
        ))}
        </div>
        <ChatInput setMessages={setMessages} messages={messages} initialSend={initialSend} hasAttached={hasAttach != undefined ? hasAttach : true} sendMessageFunction={sendMessageFunction}/>
    </section>
  );
}

export default Chat;
