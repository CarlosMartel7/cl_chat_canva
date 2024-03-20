import React, { Fragment, useState } from "react";
import { MiniMenuProps } from "./mini-menu/Mini_Menu.types";
import { MINIMENU } from "./mini-menu/Mini_Menu.functions";

function MiniMenu({ isOpen, hasEdit, hasDelete, handleEditMessage, handleDeleteMessage }: MiniMenuProps): JSX.Element {
  return (
    <Fragment>
      {isOpen ? (
        <Fragment>
          <div className="absolute right-2 rounded text-chat-primary bg-white py-2 z-50">
            {hasEdit ? (
              <button className="pl-3 pr-8 py-1 text-sm w-full text-left hover:bg-chat-user" onClick={handleEditMessage}>
                Editar
              </button>
            ) : (
              ""
            )}

            {hasDelete ? (
              <button className="pl-3 pr-8 py-1 text-sm w-full text-left hover:bg-chat-user" onClick={handleDeleteMessage}>
                Deletar
              </button>
            ) : (
              ""
            )}
          </div>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default MiniMenu;
