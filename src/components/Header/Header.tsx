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

  return (
    <header
      data-testid="header"
    >
        <div
          className={style["header-buttons-container"]}
        >
          <Button 
            data-testid="toggle-menu-button"
            aria-label="Toggle menu"
            className={`${config.isDarkModeOn ? style["toggle-menu-button-dark"] : style["toggle-menu-button-light"]} ${style["toggle-menu-button"]} ${isMenuHidden ? "" : style["open-menu"]}`}
            onClick={() => setIsMenuHidden(prevState => !prevState)}
          />
          <Button
            aria-label="Toggle mode"
            className={`${config.isDarkModeOn ? style["toggle-mode-button-dark"] : style["toggle-mode-button-light"]} toggle-mode-button`}
            name="toggle-mode"
            label="Toggle mode"
            onClick={() => {
              utils.toggleMode(config.isDarkModeOn);
              setConfig(prevState => ({
                    ...prevState,
                    isDarkModeOn: !prevState.isDarkModeOn
                  }));
            }}
            data-testid="toggle-mode-button"
            role="button"
          />
        </div>
        <nav
          data-testid="header-nav-bar"
          className={isMenuHidden ? style["hide"] : style["show"]}
        >
          <ul>
            <li>Font family</li>
            <li>Font size</li>
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
        <h1>E-reader</h1>
      </header>
  )
}

export default Header;