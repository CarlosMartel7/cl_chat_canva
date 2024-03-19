import React, { useEffect, useRef, useState } from "react";
import Message from "../constructors/Message";
import { deleteMessageFunction, editChangesFunction, message} from "../constructors/message/Message.types";
import ChatInput from "../constructors/chat-input/ChatInput";
import ChatHeader from "../constructors/chat-header/ChatHeader";
import '../../index.css'
import './styles.css'

type user = { userId: string; name: string; photo: string; phone: string }

interface ChatProps {
  devMode: boolean;
  chat: message[];
  user: user;
  friend: user;
  deletedLabel: string;
  editMessageFunction: editChangesFunction;
  deleteMessageFunction: deleteMessageFunction;
  hasAttach?: boolean;
  hasEdit?: boolean;
  handleGoBackButton: () => void;
}

function Chat({ devMode, chat, user, friend, deletedLabel, editMessageFunction, deleteMessageFunction, hasAttach, hasEdit, handleGoBackButton }: ChatProps): JSX.Element {
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
    if(screenRef.current){
      screenRef.current.scrollTop = screenRef.current.scrollHeight
    }
  }, [messages])

  return (
    <section className="w-full h-full relative overflow-hidden">
        <ChatHeader friend={friend} handleGoBackButton={handleGoBackButton}/>
        <div className="w-full h-[80vh] message-area-h h-80vh overflow-y-auto pb-4" id="main-chat" ref={screenRef}>
        {messages.map((thisMessage: message, index: number) => (
          <Message message={thisMessage} index={index} deletedLabel={deletedLabel} saveChangesFunc={saveChangesFunc} key={thisMessage.order} hasEdit={hasEdit != undefined ? hasEdit : true} />
        ))}
        </div>
        <ChatInput setMessage={setMessages} initialSend={"received"} hasAttached={hasAttach != undefined ? hasAttach : true}/>
    </section>
  );
}

export default Chat;
