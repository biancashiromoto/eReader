import { useContext } from 'react';
import Button from '../Button/Button';
import Utils from '../../utils/Utils';
import AppContext from '../../context/AppContext';

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
    <header data-testid="header">
        <div className="header-buttons-container">
          <Button 
            data-testid="toggle-menu-button"
            aria-label="Toggle menu"
            className={`toggle-menu-button`}
            label="Toggle menu"
            onClick={() => setIsMenuHidden(prevState => !prevState)}
          />
          <Button
            aria-label="Toggle mode"
            className={`${config.isDarkModeOn ? "toggle-mode-button-dark" : "toggle-mode-button-light"} toggle-mode-button`}
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
          className={isMenuHidden ? "hide" : "show"}
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