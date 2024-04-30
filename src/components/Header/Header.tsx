import { useContext, useState } from 'react';
import Button from '../Button/Button';
import Utils from '../../helpers/Utils';
import AppContext from '../../context/AppContext';
import style from "./Header.module.css";
import Styles from '../../helpers/Styles';

const Header = () => {
  const utils = new Utils();
  const styles = new Styles();
  const { max, min } = styles.fontSizes;

  const {
    config,
    setConfig,
    isMenuHidden,
    setIsMenuHidden
  } = useContext(AppContext);

  const [isFontSizeControlHidden, setIsFontSizeControlHidden] = useState<boolean>(true);

  // Sets preferences to default
  const clearPreferences = () => {
    setConfig(styles.defaultConfig);
  }

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
    <header
      data-testid="header"
      className={`${config.isDarkModeOn ? style["header-dark"] : style["header-light"]}`}
    >
      <div
        className={style["header-container"]}
      >
        <span
          aria-label="Toggle menu"
          className={`${
            config.isDarkModeOn ? 
            style["toggle-menu-button-dark"] : 
            style["toggle-menu-button-light"]} ${style["toggle-menu-button"]
            } 
            ${
              isMenuHidden ? (config.isDarkModeOn ? style["closed-menu-dark"] : style["closed-menu-light"]) : style["open-menu"]
            }
            `}
          data-testid="toggle-menu-button"
          onClick={() => setIsMenuHidden(prevState => !prevState)}
          onMouseOver={() => setIsMenuHidden(false)}
          onMouseLeave={() => setIsMenuHidden(true)}
        />
        <h1>eReader</h1>
        <label
          className={`${config.isDarkModeOn ? style["toggle-mode-label-dark"] : style["toggle-mode-label-light"]} ${style["toggle-mode-label"]}`}
        >
          <input
            type="checkbox"
            title="toggle-mode-button"
            aria-label="Toggle mode"
            className={style["toggle-mode-button"]}
            data-testid="toggle-mode-button"
            name="toggle-mode-button"
            checked={config.isDarkModeOn}
            onChange={() => setConfig(prevState => ({
              ...prevState,
              isDarkModeOn: !prevState.isDarkModeOn          
            }))}
          >
          </input>
        </label>
      </div>
      <nav
        data-testid="header-navbar"
        onMouseOver={() => setIsMenuHidden(false)}
        onMouseLeave={() => setIsMenuHidden(true)}
      >
        {isMenuHidden ? null : (
        <ul
          className={`${style["header-navbar"]} ${config.isDarkModeOn ? style["header-navbar-dark"] : style["header-navbar-light"]}`}
          data-testid="header-ul"
        >
          <li
            data-testid="clear-preferences"
            onClick={() => {
              clearPreferences();
            }}
          >
            Clear preferences
          </li>
          <li
            data-testid="font-size-control"
            onMouseOver={() => setIsFontSizeControlHidden(false)}
            onMouseLeave={() => setIsFontSizeControlHidden(true)}
          >
            {`Font size: ${config.fontSize}px`}
            <div
              className="font-size-buttons"
              data-testid="font-size-control_buttons"
            >
            {isFontSizeControlHidden ? null : (
              <div className={`${style["font-size-control"]}`}>
                <Button
                  className={`${style["decrease-font-size-button"]} ${style["font-size-button"]}`}
                  data-testid="decrease-font-size-button"
                  name="decrease-font-size"
                  onClick={() => resizeFont(config.fontSize - 1)}
                  aria-label="Decrease font size"
                  label="-"
                />
                <input
                  id="font-size-range"
                  type="range"
                  value={config.fontSize}
                  max={max}
                  min={min}
                  onChange={(e) => resizeFont(e.target.valueAsNumber)}
                  aria-label={`Font Size: ${config.fontSize}px`}
                />
                <Button
                  className={`${style["increase-font-size-button"]} ${style["font-size-button"]}`}
                  data-testid="increase-font-size-button"
                  name="increase-font-size"
                  onClick={() => resizeFont(config.fontSize + 1)}
                  aria-label="Increase font size"
                  label="+"
                />
              </div>
            )}
          </div>
          </li>
        </ul>
        )}
      </nav>
    </header>
  )
}

export default Header;