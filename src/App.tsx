import { useEffect, useState } from "react";
import "./App.css";
import Utils from "./helpers/Utils";
import { configType } from "./types/Types";
import AppContext from "./context/AppContext";
import Header from "./components/Header/Header";
import Display from "./components/Display/Display";

function App() {

  // Instance of class Utils to handle preferences changes
  const utils: Utils = new Utils();

  // State hook to manage configuration settings
  const [config, setConfig] = useState<configType>(() => {
    const {fontSize, isDarkModeOn} = utils.loadPreferences();
    return {
      fontSize,
      isDarkModeOn
    }
  });

  // Effect hook to toggle dark mode and save preferences when configurations are changed
  useEffect(() => {
    utils.toggleMode(config.isDarkModeOn);
    utils.savePreferences(config);
  }, [config]);

  return (
    <AppContext.Provider
      value={{config, setConfig}}
    >
        <Header />
        <Display />
    </AppContext.Provider>
  )
}

export default App;
