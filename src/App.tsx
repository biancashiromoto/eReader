import { useEffect, useState } from "react";
import "./App.css";
import Utils from "./utils/Utils";
import { configType } from "./types/Types";
import Button from "./components/Button/Button";
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

  // Resizes the text font to a new size passed as parameter.
  const resizeFont = (newSize: number) => {
    if (utils.validateFontSize(newSize)) {
      setConfig({
        ...config,
        fontSize: newSize
      })
    }
  }

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
        <div className="buttons-container">
          <div className="font-size-buttons">
            <Button
              className="decrease-font-size-button font-size-button"
              name="decrease-font-size"
              label="-"
              onClick={() => resizeFont(config.fontSize - 1)}
              aria-label="Decrease font size"
              role="button"
            />
            <label
              htmlFor="font-size-range"
              className="font-size-range"
            >
              {`Font size: ${config.fontSize}px`}
              <input
                id="font-size-range"
                type="range"
                value={config.fontSize}
                max={utils.validFontSizes.max}
                min={utils.validFontSizes.min}
                onChange={(e) => resizeFont(e.target.valueAsNumber)}
                aria-label={`Font Size: ${config.fontSize}px`}
              />
            </label>
            <Button
              className="increase-font-size-button font-size-button"
              label="+"
              name="increase-font-size"
              onClick={() => resizeFont(config.fontSize + 1)}aria-label="Increase font size"
              role="button"
            />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  )
}

export default App;
