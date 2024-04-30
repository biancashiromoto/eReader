import { createContext } from "react";
import { configType } from "../types/Types";

type AppContextType = {
  config: configType,
  setConfig: React.Dispatch<React.SetStateAction<configType>>,
};

const AppContext = createContext({} as AppContextType);

export default AppContext;