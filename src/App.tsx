import { useEffect, useState } from "react";
import "./App.css";
import Utils from "./utils/Utils";
import { configType } from "./types/Types";
import Button from "./components/Button/Button";

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

  // Effect hook to toggle dark mode and save preferences when configurations are changed
  useEffect(() => {
    utils.toggleMode(config.isDarkModeOn);
    utils.savePreferences(config);
  }, [config])

  // Resizes the text font to a new size.
  const resizeFont = (newSize: number) => {
    setConfig({
      ...config,
      fontSize: newSize
    })
  }

  // Sets preferences to default
  const clearPreferences = () => {
    setConfig(utils.defaultConfig);
  }

  return (
    <div className="reader-screen">
      <Button
          className={`${config.isDarkModeOn ? "toggle-mode-button-dark" : "toggle-mode-button-light"} toggle-mode-button`}
          name="toggle-mode"
          onClick={() => {
            utils.toggleMode(config.isDarkModeOn);
            setConfig(prevState => ({
                  ...prevState,
                  isDarkModeOn: !prevState.isDarkModeOn
                }));
          }}
        />
      <h1>E-reader</h1>
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
      </article>
      <div className="buttons-container">
        <div className="font-size-buttons">
          <Button
            className="decrease-font-size-button font-size-button"
            name="decrease-font-size"
            label="-"
            onClick={() => resizeFont(config.fontSize - 1)}
          />
          <label
            className="font-size-range"
          >
            {`Font size: ${config.fontSize}px`}
            <input
              type="range"
              value={config.fontSize}
              max={40}
              min={14}
              onChange={(e) => resizeFont(e.target.valueAsNumber)}
            />
          </label>
          <Button
            className="increase-font-size-button font-size-button"
            label="+"
            name="increase-font-size"
            onClick={() => resizeFont(config.fontSize + 1)}
          />
        </div>
        <Button
          className={`${config.isDarkModeOn ? "clear-preferences-button-dark" : "clear-preferences-button-light"} clear-preferences-button`}
          name="clear-preferences"
          label="Clear preferences"
          onClick={() => clearPreferences()}
        />
      </div>
    </div>
  )
}

export default App;
