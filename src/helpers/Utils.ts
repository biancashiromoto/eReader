import { configType } from "../types/Types";
import Styles from "./Styles";

export default class Utils {
  private _styles = new Styles();
  
  /**
   *  Validates the new font size.
   * @param newSize Number indicating the new font size in pixels
   * @returns Boolean representing wether the new size is between tha maximum and minimum values allowed 
   */
  public  validateFontSize(newSize: number): boolean {
    return newSize <= this._styles.fontSizes.max && newSize >= this._styles.fontSizes.min
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
    const { fontSize, isDarkModeOn } = this._styles.defaultConfig;
    return preferences ? JSON.parse(preferences) : {
      fontSize,
      isDarkModeOn
    }
  }

  /**
   * Toggles dark mode on or off.
   * @param isDarkModeOn Boolean indicating wether dark mode is enabled or not.
   */
  public toggleMode(isDarkModeOn: configType["isDarkModeOn"]): void {
    document.body.classList.toggle("dark-mode", isDarkModeOn);
    document.body.classList.toggle("light-mode", !isDarkModeOn);
  }
}