import { configType, validFontSizes } from "../types/Types";

export default class Utils {

  // Default configuration for preferences
  public defaultConfig: configType = {
    fontSize: 18,
    isDarkModeOn: true
  }

  // Valid font sizes
  public validFontSizes: validFontSizes = {
    max: 40,
    min: 12
  }

  /**
   *  Validates the new font size.
   * @param newSize Number indicating the new font size in pixels
   * @returns Boolean representing wether the new size is between tha maximum and minimum values allowed 
   */
  public  validateFontSize(newSize: number) {
    return newSize <= this.validFontSizes.max && newSize >= this.validFontSizes.min
  }

  /**
   * Saves preferences to local storage.
   * @param preferences The preferences object to be saved.
   */
  public savePreferences(preferences: configType): void {
    localStorage.setItem("config", JSON.stringify(preferences));
  }

  /**
   * Loads preferences from local storage.
   * If no preferences are found, returns the default preferences.
   * If preferences are found in local storage, returns the loaded preferences.
   * @returns The loaded preferences object or the default preferences.
   */
  public loadPreferences(): configType {
    const preferences = localStorage.getItem("config");
    return preferences ? JSON.parse(preferences) : {fontSize: 18, isDarkModeOn: true};
  }

  /**
   * Toggles dark mode on or off.
   * @param isDarkModeOn Boolean indicating wether dark mode is enabled or not.
   */
  public toggleMode(isDarkModeOn: configType["isDarkModeOn"]) {
    document.body.classList.toggle("dark-mode", isDarkModeOn);
    document.body.classList.toggle("light-mode", !isDarkModeOn);
  }

  /**
   * Toggles the menu.
   * @param isMenuHidden Boolean indicating wether the nav bar is shown or not
   */
  public toggleMenu(isMenuHidden: boolean) {
    const navBar = document.getElementsByTagName("nav")[0];
    navBar.classList.toggle("hide", isMenuHidden);
    navBar.classList.toggle("show", !isMenuHidden);
  }

}