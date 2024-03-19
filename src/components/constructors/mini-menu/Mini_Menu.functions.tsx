import React, { Fragment, useRef, useState } from "react";
import { MiniMenuModalProps } from "./Mini_Menu.types";
import TextArea from "../common/TextArea";
import { message } from "../message/Message.types";

export namespace MINIMENU {
  export function getHighestZindex(): number {
    const zIndexes: number[] = [];

    for (const element of Array.from(document.querySelectorAll("*"))) {
      const zIndex: string = window.getComputedStyle(element, null).getPropertyValue("z-index");

      if (zIndex !== null && zIndex !== "auto") {
        zIndexes.push(Number(zIndex));
      }
    }

    if (zIndexes.length === 0) {
      return 0;
    }

    return Math.max(...zIndexes);
  }

  export function ModalEdit({ messageToChange, open, saveChangesFunc, setOpen, index }: MiniMenuModalProps): JSX.Element {
    const [editableMessage, setEditableMessage] = useState<string>(messageToChange.content);

    const [textHeight, setTextHeight] = useState<number>(10);

    const textRef = useRef<null | HTMLTextAreaElement>(null);

    const handleSetValue = (value: string): void => {
      setEditableMessage(value);
  
      if (textRef.current) {
        if (textRef.current.scrollHeight > textRef.current.offsetHeight) {
          setTextHeight(16);
        } else if (textHeight > 10) {
          setTextHeight(10);
        }
      }
    };

    const handleSaveChanges = (): void => {
      let messageContent: message = {
        content: editableMessage,
        format: 'text',
        isUser: messageToChange.isUser,
        order: messageToChange.order,
        sendStatus: messageToChange.sendStatus,
        time: messageToChange.time
      }

      saveChangesFunc('text', messageContent, index,  'edit')
    } 

    return (
      <Fragment>
        {open ? (
          <Fragment>
          <div
            className={`fixed top-0 left-0 w-screen h-screen bg-black/20`}
            style={{ zIndex: getHighestZindex() + 1 }}
            onClick={() => setOpen(false)}
          >
          </div>

          <div className="fixed left-1/2 -translate-x-1/2 translate-y-1/3 p-6 bg-slate-100 rounded-md shadow-md  min-w-[500px]" style={{ zIndex: getHighestZindex() + 2 }}>
              <h2 className="text-chat-primary">Edite a sua mensagem</h2>
              <div className="my-3">
              <TextArea textHeight={textHeight} textRef={textRef} textValue={editableMessage} handleSetValue={handleSetValue} />
              </div>
              <button className="bg-chat-user text-chat-primary p-2 rounded-md w-full transition hover:bg-chat-primary hover:text-white" onClick={handleSaveChanges}>OK</button>
            </div>
          </Fragment>
        ) : (
          ""
        )}
      </Fragment>
    );
  }

  export function ModalDelete({ messageToChange, open, saveChangesFunc, index, setOpen }: MiniMenuModalProps): JSX.Element {
    const handleDeleteMessage = () => {
      let messageContent: message = {
        content: "",
        format: 'deleted',
        isUser: messageToChange.isUser,
        order: messageToChange.order,
        sendStatus: messageToChange.sendStatus,
        time: messageToChange.time
      }

      saveChangesFunc('text', messageContent, index,  'deleted')
    } 

    return (
      <Fragment>
        {open ? (
          <Fragment>
          <div
            className={`fixed top-0 left-0 w-screen h-screen bg-black/20`}
            style={{ zIndex: getHighestZindex() + 1 }}
            onClick={() => setOpen(false)}
          >
          </div>

          <div className="fixed left-1/2 -translate-x-1/2 translate-y-1/3 p-6 bg-slate-100 rounded-md shadow-md  min-w-[500px]" style={{ zIndex: getHighestZindex() + 2 }}>
              <h2 className="text-chat-primary">Deseja deletar essa mensagem?</h2>
              <div className="my-3">
              </div>
              <button className="bg-chat-user text-chat-primary p-2 my-3 rounded-md w-full transition hover:bg-chat-primary hover:text-white" onClick={handleDeleteMessage}>Deletar para todos</button>
              <button className="bg-chat-user text-chat-primary p-2 rounded-md w-full transition hover:bg-chat-primary hover:text-white" onClick={() =>  setOpen(false)}>Fechar</button>
            </div>
          </Fragment>
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}
