import React, { Fragment, useEffect, useRef, useState } from "react";
import { $message_color, message, saveChangesFunction } from "./Message.types";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import MiniMenu from "../Mini_Menu";
import { MINIMENU } from "../mini-menu/Mini_Menu.functions";

interface EncapsulateMessageProps {
  isUser: boolean;
  hasEdit?: boolean;
  hasDelete: boolean;
  index: number;
  style?: React.CSSProperties;
  format: "text" | "other";
  messageToChange: message;
  saveChangesFunc: saveChangesFunction;
  children: JSX.Element;
}

export namespace MESSAGE {
  export function EncapsulateMessage({
    hasEdit,
    hasDelete,
    index,
    isUser,
    style,
    format,
    messageToChange,
    saveChangesFunc,
    children,
  }: EncapsulateMessageProps): JSX.Element {
    const [showDropArrow, setShowDropArrow] = useState<boolean>(false);
    const messageColor: $message_color = isUser ? $message_color.HEX_USER : $message_color.HEX_FRIEND;
    const [miniMenu, setMiniMenu] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);

    const menuRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMiniMenu(false);

        const mainChatElement = document.getElementById("main-chat");
        if (mainChatElement) {
          if (mainChatElement.style.overflowY === "hidden") {
            mainChatElement.style.overflowY = "scroll";
          } else {
            mainChatElement.style.overflowY = "hidden";
          }
        }
      }
    };

    const handleEditMessage = (): void => {
      setMiniMenu(false);
      setOpenEdit(true);
    };

    const handleDeleteMessage = (): void => {
      setMiniMenu(false);
      setOpenDelete(true);
    };
    const handleSetMiniMenu = (): void => {
      setMiniMenu((prev) => !prev);

      const mainChatElement = document.getElementById("main-chat");
      if (mainChatElement) {
        if (mainChatElement.style.overflowY === "hidden") {
          mainChatElement.style.overflowY = "scroll";
        } else {
          mainChatElement.style.overflowY = "hidden";
        }
      }
    };

      return (
        <Fragment>
          <MINIMENU.ModalEdit
            open={openEdit}
            messageToChange={messageToChange}
            setOpen={setOpenEdit}
            saveChangesFunc={saveChangesFunc}
            index={index}
          />
          <MINIMENU.ModalDelete
            open={openDelete}
            index={index}
            messageToChange={messageToChange}
            setOpen={setOpenDelete}
            saveChangesFunc={saveChangesFunc}
          />

          <div
            className={`flex justify-end rounded-br rounded-bl shadow-custom max-w-[400px] message-w text-chat-primary relative ${
              isUser ? "rounded-tl order-1" : "rounded-tr order-2"
            }`}
            style={{ backgroundColor: messageColor }}
          >
            <div
              className="p-2 box-border flex bg-transparent items-start justify-end max-w-full"
              style={style}
              onMouseEnter={() => setShowDropArrow(true)}
              onMouseLeave={() => setShowDropArrow(false)}
            >
              {children}
            </div>

            {isUser && hasEdit && hasDelete ? (
              <span
                className={`absolute text-chat-secondary hover:text-chat-secondary/30 transition-all rounded-bl-[22px] p-[3px] arrow-messages-edit`}
                style={{ backgroundColor: messageColor }}
                onMouseEnter={() => setShowDropArrow(true)}
                onMouseLeave={() => setShowDropArrow(false)}
                ref={menuRef}
              >
                {showDropArrow || (miniMenu && isUser) ? (
                  <div className="relative">
                    <button
                      onClick={() => {
                        handleSetMiniMenu();
                      }}
                    >
                      <ArrowDropDownIcon />
                    </button>
                  </div>
                ) : (
                  ""
                )}
                <MiniMenu
                  isOpen={miniMenu}
                  handleEditMessage={handleEditMessage}
                  handleDeleteMessage={handleDeleteMessage}
                  hasDelete={hasDelete}
                  hasEdit={format === "text" && hasEdit ? true : false}
                />
              </span>
            ) : (
              ""
            )}
          </div>
        </Fragment>
      );
  }

  interface SendStatusProps {
    readStatus?: "pending" | "send" | "read" | "received";
  }

  export function SendStatus({ readStatus }: SendStatusProps): JSX.Element {
    switch (readStatus) {
      case "pending":
        return (
          <span className=" text-sm">
            <QueryBuilderIcon fontSize="inherit" />
          </span>
        );
      case "send":
        return (
          <span className=" text-sm">
            <CheckIcon fontSize="inherit" />
          </span>
        );
      case "read":
        return (
          <span className=" text-[#1ea142] text-sm">
            <DoneAllIcon fontSize="inherit" />
          </span>
        );
      case "received":
        return (
          <span className=" text-sm">
            <DoneAllIcon fontSize="inherit" />
          </span>
        );
      default:
        return <Fragment />;
    }
  }

  export function secondsToMinutes(seconds: number): `${string}:${string}` {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    const formattedMinutes: string = minutes.toString().padStart(2, "0");
    const formattedSeconds: string = remainingSeconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }
}
