import {createContext, useContext} from "react";

const DiscussionContext = createContext({});

const DiscussionProvider = ({children}) => {
  return (
      <DiscussionContext.Provider value={{}}>
        {children}
      </DiscussionContext.Provider>
  )
} 

export default DiscussionProvider;

export const useDiscussion = ()=> useContext(DiscussionContext);