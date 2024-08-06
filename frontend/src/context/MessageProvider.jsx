import {createContext, useContext} from "react";

const MessageContext = createContext({});

const MessageProvider = ({children}) => {
  return (
      <MessageContext.Provider value={{}}>
        {children}
      </MessageContext.Provider>
  )
} 

export default MessageProvider;

export const useMessage = ()=> useContext(MessageContext);