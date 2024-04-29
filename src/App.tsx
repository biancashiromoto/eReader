import { useEffect, useState } from "react";
import "./App.css";
import Utils from "./helpers/Utils";
import { configType } from "./types/Types";
import AppContext from "./context/AppContext";
import Header from "./components/Header/Header";
import { text } from "./helpers/text";

function App() {

  // Instance of class Utils to handle preferences changes
  const utils = new Utils();

  // State hook to manage configuration settings
  const [config, setConfig] = useState<configType>(() => {
    const {fontSize, isDarkModeOn} = utils.loadPreferences();
    return {
      fontSize,
      isDarkModeOn
    }
  });

  // State hook to manage the menu's visibility
  const [isMenuHidden, setIsMenuHidden] = useState<boolean>(true);

  // Effect hook to toggle dark mode and save preferences when configurations are changed
  useEffect(() => {
    utils.toggleMode(config.isDarkModeOn);
    utils.savePreferences(config);
  }, [config])

  return (
    <AppContext.Provider
      value={{config, setConfig, isMenuHidden, setIsMenuHidden}}
    >
      <div
        className="reader-screen"
        data-testid="reader-screen"
      >
        <Header />
        <article
          className="text-display"
        >
          {text.map((paragraph, index) => (
            <p
              key={index}
              style={{fontSize: `${config.fontSize}px`}}
            >
              {paragraph}
            </p>
          ))}
        </article>
      </div>
    </AppContext.Provider>
  )
}

export default App;
