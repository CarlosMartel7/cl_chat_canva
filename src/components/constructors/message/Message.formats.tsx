// React
import React, { Fragment, useEffect, useRef, useState } from "react";
// types
import { $message_color, message, saveChangesFunction } from "./Message.types";
// functions (jsx element)
import { MESSAGE } from "./message.functions";
import { USER } from "../User";
//other libraries
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import BlockIcon from "@mui/icons-material/Block";
import { urlBrand } from "../user/User.types";

interface MessageFormatProps {
  index: number;
  hasEdit: boolean;
  content: message;
  isUser: boolean;
  photo?: {
    user: urlBrand | undefined;
    friend: urlBrand | undefined;
  };
  saveChangesFunc: saveChangesFunction
}

export function MessageText({ index, hasEdit, content, isUser, saveChangesFunc }: MessageFormatProps): JSX.Element {
  return (
    <MESSAGE.EncapsulateMessage index={index} isUser={isUser} format={"text"} hasEdit={hasEdit} messageToChange={content} saveChangesFunc={saveChangesFunc}>
      <div className={`relative ${isUser ? "pr-14" : "pr-10"}`}>
        <p className={`text-sm break-words`}>{content.content}</p>
        <div className={`text-xs absolute bottom-0 right-0 text-chat-secondary`}>
          <span className="mr-1">{content.time}</span>
          {isUser ? <MESSAGE.SendStatus readStatus={content.sendStatus} /> : ""}
        </div>
      </div>
    </MESSAGE.EncapsulateMessage>
  );
}

// Ainda é preciso colocar a foto e alterar um pouco o display do audio

export function MessageAudio({ index, content, photo, isUser, saveChangesFunc }: Omit<MessageFormatProps, "hasEdit">): JSX.Element {
  const [play, setPlay] = useState<boolean>(false);
  const [running, setRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1.0);
  const [timeAudio, setTimeAudio] = useState<number>(0);
  const [audioRange, setAudioRange] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  let animationRef: number | null = null;

  useEffect(() => {
    if (audioRef.current) {
      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          setTimeAudio(audioRef.current.duration);
          audioRef.current.defaultPlaybackRate = 1.0;
        }
      };

      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        audioRef.current?.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [content]);

  useEffect(() => {
    if (running) {
      if (play) {
        audioRef.current?.play();
        playingAnimation();
      } else {
        audioRef.current?.pause();
      }
    }
  }, [play]);

  const handlePlayPause = (): void => {
    if (running) {
      setPlay((prev) => !prev);
    } else {
      audioRef.current?.addEventListener("ended", () => {
        setRunning(false), setPlay(false);
        setAudioRange(0);
        if (progressRef.current) {
          progressRef.current.style.width = "0";
        }
      });
      setRunning(true);
      setPlay((prev) => !prev);
    }
  };

  const playingAnimation = (): void => {
    if (!audioRef.current?.paused) {
      if (audioRef.current) {
        setAudioRange(audioRef.current.currentTime);
      }
      animationRef = requestAnimationFrame(playingAnimation);
    } else {
      if (animationRef) {
        cancelAnimationFrame(animationRef);
      }
    }
  };

  const handleChangeCurrentTime = (e: React.FormEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    const timeFloat = parseFloat(target.value);

    if (!isNaN(timeFloat) && audioRef.current) {
      audioRef.current.currentTime = (timeFloat * timeAudio) / 100;
    }
    setAudioRange((timeFloat * timeAudio) / 100);
  };

  const handleChangeSpeed = (): null => {
    if (audioRef.current) {
      switch (speed) {
        case 1.0:
          audioRef.current.playbackRate = 1.5;
          setSpeed(1.5);
          return null;
        case 1.5:
          audioRef.current.playbackRate = 2.0;
          setSpeed(2.0);
          return null;
        case 2.0:
          audioRef.current.playbackRate = 1.0;
          setSpeed(1.0);
          return null;
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <MESSAGE.EncapsulateMessage index={index} isUser={isUser} format={"other"} messageToChange={content} saveChangesFunc={saveChangesFunc}>
      <Fragment>
        <audio src={content.content} ref={audioRef} />
        <div className="flex box-border justify-between p-1 w-[376px]">
          {running ? (
            <div className="h-14 w-14 flex items-center justify-around">
              <button className={`text-white text-center text-sm`}>
                <div className="w-full py-1 px-3 rounded-full bg-chat-secondary" onClick={handleChangeSpeed}>
                  {speed.toFixed(1)}
                  <span>x</span>
                </div>
              </button>
            </div>
          ) : (
            <USER.PHOTO.MiniPhoto photo={isUser ? photo?.user : photo?.friend} />
          )}
          <button className={`mr-2 text-chat-secondary mr`} type="button" onClick={handlePlayPause}>
            {!running ? <PlayArrowIcon fontSize="large" /> : play ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
          </button>
          <div className="flex items-center">
            <div className="relative">
              <div className="flex items-center">
                <div className="range-button relative">
                  <span
                    className={`absolute bg-slate-600 h-[6px] rounded-full cursor-pointer pointer-events-none`}
                    style={{ width: `${Math.ceil((audioRange / timeAudio) * 250) - 7}px` }}
                    ref={progressRef}
                  ></span>
                  <input
                    ref={rangeRef}
                    className="block cursor-pointer"
                    type="range"
                    min="0"
                    max="100"
                    value={timeAudio ? (audioRange / timeAudio) * 100 : 0}
                    onInput={(e) => handleChangeCurrentTime(e)}
                  />
                </div>
              </div>
              <div className={`text-xs absolute top-[18px] text-chat-secondary`}>
                <span>{MESSAGE.secondsToMinutes(Math.round(timeAudio))}</span>
              </div>
              <div className={`text-xs absolute top-[18px] right-0 text-chat-secondary`}>
                <span className="mr-1">{content.time}</span>
                {isUser ? <MESSAGE.SendStatus readStatus={content.sendStatus} /> : ""}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </MESSAGE.EncapsulateMessage>
  );
}

export function MessageImage({ index, content, isUser, saveChangesFunc }: Omit<MessageFormatProps, "hasEdit">): JSX.Element {
  return (
    <MESSAGE.EncapsulateMessage index={index}
      isUser={isUser}
      style={{ padding: "6px 6px 6px 6px" }}
      messageToChange={content}
      format={"other"}
      saveChangesFunc={saveChangesFunc}
    >
      <div className="w-[300px] max-h-[4900px] relative">
        <div className="flex items-center justify-center h-full bg-black rounded">
          <img src={content.content} className="w-full flex-grow-0 flex-shrink-0 rounded" />
        </div>
        <div className={`text-xs absolute bottom-[2px] right-1 text-white`}>
          <span>{content.time}</span>
        </div>
      </div>
    </MESSAGE.EncapsulateMessage>
  );
}

export function MessageVideo({ index, content, isUser, saveChangesFunc }: Omit<MessageFormatProps, "hasEdit">): JSX.Element {
  return (
    <MESSAGE.EncapsulateMessage index={index}
      isUser={isUser}
      style={{ padding: "6px 6px 6px 6px" }}
      messageToChange={content}
      format={"other"}
      saveChangesFunc={saveChangesFunc}
    >
      <div className="w-[300px] max-h-[300px] relative">
        <div className="flex items-center justify-center h-full bg-black rounded">
          <video controls preload="metadata" className="w-full flex-grow-0 flex-shrink-0 rounded">
            <source src={content.content} />
          </video>
        </div>
        <div className={`text-xs absolute bottom-[2px] right-1 text-white`}>
          <span>{content.time}</span>
        </div>
      </div>
    </MESSAGE.EncapsulateMessage>
  );
}

type MessageDeletedProps = {
  index: number;
  isUser: boolean;
  deletedLabel: string;
};

export function MessageDeleted({ index, isUser, deletedLabel }: MessageDeletedProps): JSX.Element {
  const messageColor = isUser ? $message_color.HEX_USER : $message_color.HEX_FRIEND;

  return (
    <div
      className={`flex justify-end rounded-br rounded-bl shadow-custom max-w-[400px] text-chat-primary ${
        isUser ? "rounded-tl order-1" : "rounded-tr order-2"
      }`}
      style={{ backgroundColor: messageColor }}
    >
      <div className="p-2 box-border flex gap-2 bg-transparent items-center max-w-full">
        <BlockIcon />
        <p className={`text-sm break-words`}>{deletedLabel}</p>
      </div>
    </div>
  );
}
