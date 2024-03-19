import React from "react";

interface TextAreaProps {
	textRef: React.MutableRefObject<HTMLTextAreaElement | null>,
	textHeight: number,
	textValue: string
	handleSetValue: (value: string) => void
}

function TextArea({textRef, textHeight, textValue, handleSetValue}: TextAreaProps): JSX.Element {
	
	return (
    <textarea
      ref={textRef}
      className={`bg-white rounded-md py-2 px-4 !outline-none w-full overflow-y-visible resize-none text-chat-primary`}
      style={{ height: textHeight * 0.25 + "rem" }}
      placeholder="Digite a sua mensagem"
      value={textValue}
      onChange={(e) => handleSetValue(e.target.value)}
    />
  );
}

export default TextArea;
