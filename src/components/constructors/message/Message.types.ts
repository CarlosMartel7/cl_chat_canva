export type messageFormats = "text" | "audio" | "image" | "video" | "deleted";

export type saveChangesFunction = (format: string, content: message, index: number, type: 'deleted' | 'edit') => void 

export type editChangesFunction = (format: string, content: message, index: number ) => void 

export type deleteMessageFunction = (index: number, prevContent: message) => void

export type sendMessageFunction = (format: string, content: message[]) => void

export type message = {
  content: string;
  format: messageFormats;
  order: number;
  isUser: boolean;
  time: string;
  sendStatus?: 'pending' | 'send' | "received" | "read"
};

export enum $message_color {
  USER = "chat-user",
  FRIEND = "chat-friend",
  TEXT = "chat-primary",
  SECONDARY_TEXT = "chat-secondary",
  HEX_USER = "#d3dcfd",
  HEX_FRIEND = "#fff"
}

export type defaultUser =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACWUlEQVR4nO2ZP08VQRDAfz7ztOAJhQlWWII2IhbS2dEg+CCBDwFaUom0EP0CWosQQPwCkkCDjR9A+ScFNmDyCtHGZ+SZifOSyQY57ti7Pcj9kkkuuZ3Z2dvZmd09KCgo8EkZGAXmgQ3gp4o8z+k7aZNLhoFtoBEh0maIHFECnp/CcVdmVDc4rvP7wFOgG2hRuQtM6jt3EMHDxjq0AFROaH8NWHR0qgTiihPz4vylU+hJmyWjtxVqYY86YXPSlz9uJg6M/ggBmDcOSMzH5ZnRf0MANo0DdxLoy8Ju6kudyJwfxoE44dNEdJr6YuvcDaDV6H8nAOc+hOaMA1Kk4jJl9GfJQRqV1BgnfL6FTqNlp5Atxihkb/NQyNBdpd0WLEXMRKvj/BHwiMDMOIM40CLVo9mpos9TTtiITJMDSscMIkqO1PkSOaKq8Rzl/FYewuZ/lDWjyN7msxY7kU+aKkfyfKQsKLjIdADLwGGC24e4cqjFrsOn87UMHG84UvM1iOUAzjdUZCbOjA2b+6RPr++Djv0iWdHw2ecfYyyLKlr2PQC7g+wkfbp8D2DFGBsnfZ6Y/l75MDhmDO4BbaRHG/DV9Nfnw2iLY3Q94TVKFBXgg+nnI3DZl/F+ZzHvAA98GeefrR1jvw7cwzOP9SRlT1XvgYcJs5PoDOgas3Z/p3lLUXVulW3BeQdM6GxJJrmuV/BX9blL301oW9Fx7UjGGyRl2vV0Vfe4ZagDr4EbZMhN4AWwewbHd/UXlbedZ1Jua/5+CawBX3Q3+Uulpot0VdvIeroV2umCAi4AfwF1jXX6i4PPbQAAAABJRU5ErkJggg==";
