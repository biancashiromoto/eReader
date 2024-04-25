import { useEffect, useState } from "react";
import "./App.css";
import Utils from "./utils/Utils";
import { actions, configType } from "./types/Types";
import Button from "./components/Button/Button";

function App() {
  const utils = new Utils();

  const [config, setConfig] = useState<configType>(() => {
    const {fontSize, isDarkModeOn} = utils.loadPreferences();
    return {
      fontSize,
      isDarkModeOn
    }
  });

  useEffect(() => {
    utils.documentStyle.backgroundColor = config.isDarkModeOn ? "black" : "white";
    utils.documentStyle.color = config.isDarkModeOn ? "white" : "black";
    utils.savePreferences(config);
  }, [config])

  const toggleMode = () => {
    setConfig(prevState => ({
      ...prevState,
      isDarkModeOn: !prevState.isDarkModeOn
    }));
  }

  const changeFontSize = (action: actions) => {
    setConfig((prevState) => ({
      ...prevState,
      fontSize: action === "increase" ? prevState.fontSize + 2 : prevState.fontSize - 2
    }));
  }

  const clearPreferences = () => {
    setConfig(utils.defaultConfig);
  }

  return (
    <div>
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
        <Button
          name="increase-font-size"
          label="Increase font size"
          onClick={() => changeFontSize("increase")}
        />
        <Button
          name="decrease-font-size"
          label="Decrease font size"
          onClick={() => changeFontSize("decrease")}
        />
        <Button
          name="toggle-mode"
          label="Toggle mode"
          onClick={() => toggleMode()}
        />
        <Button
          name="clear-preferences"
          label="Clear preferences"
          onClick={() => clearPreferences()}
        />
      </div>
    </div>
  )
}

export default App;
