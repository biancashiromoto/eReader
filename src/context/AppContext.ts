import { createContext } from "react";
import { configType } from "../types/Types";

type AppContextType = {
  config: configType,
  setConfig: React.Dispatch<React.SetStateAction<configType>>,
  isMenuHidden: boolean,
  setIsMenuHidden: React.Dispatch<React.SetStateAction<boolean>>
};

const AppContext = createContext({} as AppContextType);

export default AppContext;