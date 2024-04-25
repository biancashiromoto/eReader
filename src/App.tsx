import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [config, setConfig] = useState({
    fontSize: 18,
    isDarkModeOn: true
  });

  useEffect(() => {
    document.body.style.backgroundColor = config.isDarkModeOn ? "black" : "white";
  }, [config.isDarkModeOn])

  const toggleMode = () => {
    setConfig(prevState => ({
      ...prevState,
      isDarkModeOn: !prevState.isDarkModeOn
    }));
  }

  return (
    <div style={{backgroundColor: config.isDarkModeOn ? "black" : "white"}}>
      <h1
        style={{color: config.isDarkModeOn ? "white" : "black"}}
      >E-reader</h1>
      <article
      >
        <p
          style={{fontSize:`${config.fontSize}px`, color: config.isDarkModeOn ? "white" : "black"}}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti culpa error tempore eligendi architecto earum delectus placeat quisquam. Rerum eveniet cum voluptas sapiente sed voluptates animi laborum impedit, quos ab.
        </p>
        <p
          style={{fontSize:`${config.fontSize}px`, color: config.isDarkModeOn ? "white" : "black"}}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis accusantium ad sapiente architecto voluptatem quas modi? Magnam officia nisi quis ratione sed! Dolores, quaerat! Atque perferendis voluptas blanditiis! Ab, similique.
        </p>
      </article>
      <button
        onClick={() => {
          setConfig((prevState) => ({
            ...prevState,
            fontSize: prevState.fontSize + 2
          }));
        }}
      >
        Increase font size
      </button>
      <button
        onClick={() => {
          setConfig((prevState) => ({
            ...prevState,
            fontSize: prevState.fontSize - 2
          }));
        }}
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
