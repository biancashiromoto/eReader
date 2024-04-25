import { useEffect, useState } from "react";
import "./App.css";
import Utils from "./utils/Utils";
import { actions, configType } from "./types/Types";

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
      <button
        name="increase-font-size"
        onClick={() => changeFontSize("increase")}
      >
        Increase font size
      </button>
      <button
        name="decrease-font-size"
        onClick={() => changeFontSize("decrease")}
      >
        Decrease font size
      </button>
      <button
        onClick={() => toggleMode()}
      >
        Toggle mode
      </button>
      <button
        onClick={() => clearPreferences()}
      >
        Clear preferences
      </button>
    </div>
  )
}

export default App;
