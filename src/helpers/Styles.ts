import { configType, validFontSizesType } from "../types/Types";

export default class Styles {
  private _black: string = "rgb(36, 36, 36)";
  private _white: string = "rgb(239, 239, 239)";

  private _fontSizes: validFontSizesType = {
    max: 40,
    min: 12
  };

  private _defaultConfig: configType = {
    fontSize: 18,
    isDarkModeOn: true
  };

  public get black(): string {
    return this._black;
  }
  
  public get white(): string {
    return this._white;
  }

  public get fontSizes(): validFontSizesType {
    return this._fontSizes;
  }
  
  public get defaultConfig(): configType {
    return this._defaultConfig;
  }
}