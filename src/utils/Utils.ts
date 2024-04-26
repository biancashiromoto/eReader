import { configType } from "../types/Types";

export default class Utils {

  public documentStyle: CSSStyleDeclaration = document.body.style;
  public defaultConfig: configType = {
    fontSize: 18,
    isDarkModeOn: true
  }

  /**
   * savePreferences
   */
  public savePreferences(preferences: configType): void {
    localStorage.setItem("config", JSON.stringify(preferences));
  }

  /**
   * loadPreferences
   */
  public loadPreferences(): configType {
    const preferences = localStorage.getItem("config");
    return preferences ? JSON.parse(preferences) : {fontSize: 18, isDarkModeOn: true};
  }

  /**
   * toggleMode
   */
  public toggleMode(isDarkModeOn: configType["isDarkModeOn"]) {
    isDarkModeOn ? (
      document.body.classList.add("dark-mode"),
      document.body.classList.remove("light-mode")
    ) : (
      document.body.classList.add("light-mode"),
      document.body.classList.remove("dark-mode")
    )
  }
}