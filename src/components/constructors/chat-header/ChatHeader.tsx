import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface ChatHeaderProps {
  friend: { userId: string; name: string; photo: string; phone: string };
  headerButton?: React.ReactNode;
  handleGoBackButton: () => any;
}

function ChatHeader({ friend, handleGoBackButton, headerButton }: ChatHeaderProps): JSX.Element {
  return (
    <section className="w-full bg-gray-400">
      <div className="w-full gap-3 py-2 px-6 flex items-center">
        <span className="text-[1.5rem] arrrow-icon-size cursor-pointer flex" onClick={handleGoBackButton}>
          <ArrowBackIosNewIcon fontSize="inherit" />
        </span>
        {friend.photo ? (
          <img src={friend.photo} className="w-11 h-11 rounded-full" />
        ) : (
          <span className="text-[2.75rem] icon-size flex">
            <AccountCircleIcon fontSize="inherit" />
          </span>
        )}
        <div>
          <span className="block">{friend.name}</span>
          <i className="block text-xs">{friend.phone}</i>
        </div>
        <div style={{ justifySelf: 'end' }}>
          {headerButton}
        </div>
      </div>
    </section>
  );
}

export default ChatHeader;
