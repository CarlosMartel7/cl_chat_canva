import React from "react";
import { message, saveChangesFunction } from "../message/Message.types";

export interface MiniMenuProps {
  isOpen: boolean;
  hasEdit: boolean;
  handleEditMessage: () => void ; 
  handleDeleteMessage: () => void;
}

export interface MiniMenuModalProps {
  open: boolean;
  messageToChange: message;
  index: number;
  saveChangesFunc: saveChangesFunction;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
