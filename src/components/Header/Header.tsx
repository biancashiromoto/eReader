import { useContext } from 'react';
import Button from '../Button/Button';
import Utils from '../../utils/Utils';
import AppContext from '../../context/AppContext';
import style from "./Header.module.css";

const Header = () => {
  const utils = new Utils();
  const {
    config,
    setConfig,
    isMenuHidden,
    setIsMenuHidden
  } = useContext(AppContext);

  // Sets preferences to default
  const clearPreferences = () => {
    setConfig(utils.defaultConfig);
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
          name="toggle-mode"
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
        data-testid="header-nav-bar"
        className={`${isMenuHidden ? style["hide"] : style["show"]} ${style["header-navbar"]} ${config.isDarkModeOn ? style["header-navbar-dark"] : style["header-navbar-light"]}`}
      >
        <ul>
          <li>
          <div className="font-size-buttons">
            <label
              htmlFor="font-size-range"
              className={`${style["font-size-range"]}`}
            >
              {`Font size: ${config.fontSize}px`}
              <div className={`${style["font-size-control"]}`}>
                <Button
                  className={`${style["decrease-font-size-button"]} ${style["font-size-button"]}`}
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
                  max={utils.validFontSizes.max}
                  min={utils.validFontSizes.min}
                  onChange={(e) => resizeFont(e.target.valueAsNumber)}
                  aria-label={`Font Size: ${config.fontSize}px`}
                />
                <Button
                  className={`${style["increase-font-size-button"]} ${style["font-size-button"]}`}
                  label="+"
                  name="increase-font-size"
                  onClick={() => resizeFont(config.fontSize + 1)}aria-label="Increase font size"
                  role="button"
                />
              </div>
            </label>
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
      </nav>
    </header>
  )
}

export default Header;