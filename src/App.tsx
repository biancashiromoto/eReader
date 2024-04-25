import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const loadPreferences = () => {
    const preferences = localStorage.getItem("config");
    return preferences ? JSON.parse(preferences) : {fontSize: 18, isDarkModeOn: true};
  }

  const [config, setConfig] = useState(() => {
    const {fontSize, isDarkModeOn} = loadPreferences();
    return {
      fontSize,
      isDarkModeOn
    }
  });

  useEffect(() => {
    document.body.style.backgroundColor = config.isDarkModeOn ? "black" : "white";
    document.body.style.color = config.isDarkModeOn ? "white" : "black";
    savePreferences();
  }, [config])

  const toggleMode = () => {
    setConfig(prevState => ({
      ...prevState,
      isDarkModeOn: !prevState.isDarkModeOn
    }));
  }

  const changeFontSize = (action: string) => {
    setConfig((prevState) => ({
      ...prevState,
      fontSize: action === "increase" ? prevState.fontSize + 2 : prevState.fontSize - 2
    }));
  }

  const savePreferences = () => {
    localStorage.setItem("config", JSON.stringify(config));
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
        onClick={() => changeFontSize("increase")}
      >
        Increase font size
      </button>
      <button
        onClick={() => changeFontSize("decrease")}
      >
        Decrease font size
      </button>
      <button
        onClick={() => toggleMode()}
      >
        Toggle mode
      </button>
    </div>
  )
}

export default App;
