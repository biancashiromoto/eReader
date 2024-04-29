import { useEffect, useState } from "react";
import "./App.css";
import Utils from "./helpers/Utils";
import { configType } from "./types/Types";
import AppContext from "./context/AppContext";
import Header from "./components/Header/Header";

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
          <p
            style={{fontSize:`${config.fontSize}px`}}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti culpa error tempore eligendi architecto earum delectus placeat quisquam. Rerum eveniet cum voluptas sapiente sed voluptates animi laborum impedit, quos ab.
          </p>
          <p
            style={{fontSize:`${config.fontSize}px`}}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis accusantium ad sapiente architecto voluptatem quas modi? Magnam officia nisi quis ratione sed! Dolores, quaerat! Atque perferendis voluptas blanditiis! Ab, similique.
          </p>
          <p
            style={{fontSize:`${config.fontSize}px`}}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur incidunt officia harum voluptatibus laboriosam consectetur qui itaque optio ut quaerat! Placeat odit sapiente voluptatibus quos, culpa sunt deleniti consequuntur id!
          </p>
        </article>
      </div>
    </AppContext.Provider>
  )
}

export default App;
