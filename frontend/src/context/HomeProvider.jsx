import {createContext, useContext} from "react";

const HomeContext = createContext({});

const HomeProvider = ({children}) => {
  return (
      <HomeContext.Provider value={{}}>
        {children}
      </HomeContext.Provider>
  )
} 

export default HomeProvider;

export const useHome = ()=> useContext(HomeContext);