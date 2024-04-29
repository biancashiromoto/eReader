import { useContext, useState } from 'react';
import Button from '../Button/Button';
import Utils from '../../utils/Utils';
import AppContext from '../../context/AppContext';
import style from "./Header.module.css";
import Styles from '../../utils/Styles';

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
        <Button 
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
          role="button"
        />
        <h1>eReader</h1>
        <Button
          aria-label="Toggle mode"
          className={`${config.isDarkModeOn ? style["toggle-mode-button-dark"] : style["toggle-mode-button-light"]} toggle-mode-button`}
          data-testid="toggle-mode-button"
          label="Toggle mode"
          name="toggle-mode-button"
          onClick={() => {
            utils.toggleMode(config.isDarkModeOn);
            setConfig(prevState => ({
              ...prevState,
              isDarkModeOn: !prevState.isDarkModeOn
            }));
          }}
          role="button"
        />
      </div>
      <nav
        data-testid="header-navbar"
      >
        {isMenuHidden ? null : (
        <ul
          className={`${style["header-navbar"]} ${config.isDarkModeOn ? style["header-navbar-dark"] : style["header-navbar-light"]}`}
          data-testid="header-ul"
        >
          <li
            data-testid="font-size-control"
            onClick={() => {
              setIsFontSizeControlHidden((prevState) => !prevState);
            }}
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
                  label="-"
                  onClick={() => resizeFont(config.fontSize - 1)}
                  aria-label="Decrease font size"
                  role="button"
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
                    label="+"
                    name="increase-font-size"
                    onClick={() => resizeFont(config.fontSize + 1)}aria-label="Increase font size"
                    role="button"
                  />
              </div>
            )}
          </div>
          </li>
          <li
            data-testid="clear-preferences"
            onClick={() => {
              clearPreferences();
            }}
          >
            Clear preferences
          </li>
        </ul>
        )}
      </nav>
    </header>
  )
}

export default Header;