import { configType } from "../types/Types";

export default class Utils {

  public documentStyle: CSSStyleDeclaration = document.body.style;
  public defaultConfig: configType = {
    fontSize: 18,
    isDarkModeOn: true
  }

  /**
   * savePreferences
preferences   */
  public savePreferences(preferences: configType): void {
    localStorage.setItem("config", JSON.stringify(preferences));
  }

  /**
   * loadPreferences
preferences: config   */
  public loadPreferences(): configType {
    const preferences = localStorage.getItem("config");
    return preferences ? JSON.parse(preferences) : {fontSize: 18, isDarkModeOn: true};
  }
}