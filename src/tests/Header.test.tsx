import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Styles from "../helpers/Styles";

const styles = new Styles();
const { max } = styles.fontSizes;

describe("Tests for component Header:", () => {
  beforeEach(async () => {
    render(<App />);
    const toggleMenuButton = screen.getByTestId("toggle-menu-button");
    await userEvent.click(toggleMenuButton);
  });

  test("Should contain h1 tag with title 'eReader'", () => {
    expect(screen.getByRole("heading", {name: "eReader"})).toBeInTheDocument();
  });

  test("Should contain a button with data-testid 'toggle-menu-button'", () => {
    expect(screen.getByTestId("toggle-menu-button")).toBeInTheDocument();
  });

  test("Should contain a button with data-testid 'toggle-mode-button'", () => {
    expect(screen.getByTestId("toggle-mode-button")).toBeInTheDocument();
  });

  test("Menu should contain two li tags.", async () => {
    const headerUl = screen.getByTestId("header-ul");
    
    expect(headerUl.firstChild).toHaveRole("listitem");
    expect(headerUl.firstChild).toHaveTextContent("Font size: ");
    expect(headerUl.lastChild).toHaveRole("listitem");
    expect(headerUl.lastChild).toHaveTextContent("Clear preferences");
  });

  test("Should set configurations to default values when the button is clicked", async () => {
    const toggleModeButton = screen.getByTestId("toggle-mode-button");
    await userEvent.click(toggleModeButton);

    const fontSizeListItem = screen.getByTestId("font-size-control");
    await userEvent.click(fontSizeListItem);
    
    const rangeInput = screen.getByRole("slider");
    rangeInput.setAttribute("value", max.toString());
    
    const clearPreferencesButton = screen.getByTestId("clear-preferences");
    await userEvent.click(clearPreferencesButton);

    expect(rangeInput.getAttribute("value")).toBe(styles.defaultConfig.fontSize.toString());
    expect(document.body.classList.contains("dark-mode")).toBe(true);
  });
});

describe("Tests for font size management:", () => {
  beforeEach(async () => {
    render(<App />);

    const toggleMenuButton = screen.getByTestId("toggle-menu-button");
    await userEvent.click(toggleMenuButton);

    const fontSizeListItem = screen.getByTestId("font-size-control");
    await userEvent.click(fontSizeListItem);
  });

  test("Should display a range input after clicking the li tag with data-testid 'font-size-control' ", async () => {
    const rangeInput = screen.getByRole("slider");
    expect(rangeInput).toBeInTheDocument();
  });

  test("Font size should be initially set as default", async () => {
    const initialFontSize = styles.defaultConfig.fontSize;
    const paragraphElement = screen.getAllByRole("paragraph")[0];
    const currentFontSize = parseInt(paragraphElement.style.fontSize);
    
    expect(currentFontSize).toBe(initialFontSize);
  });

  test("Should increase font size by one unit when button '+' is clicked", async () => {
    const increaseFontSizeButton = screen.getByTestId("increase-font-size-button");
    const paragraphElement = screen.getAllByRole("paragraph")[0];
    const currentFontSize = parseInt(window.getComputedStyle(paragraphElement).fontSize);
    
    await userEvent.click(increaseFontSizeButton);

    const newFontSize = parseInt(window.getComputedStyle(paragraphElement).fontSize);
    expect(newFontSize).toBe(currentFontSize + 1);
  });

  test("Should decrease font size by one unit when button '-' is clicked", async () => {
    const decreaseFontSizeButton = screen.getByTestId("decrease-font-size-button");
    const paragraphElement = screen.getAllByRole("paragraph")[0];
    const currentFontSize = parseInt(window.getComputedStyle(paragraphElement).fontSize);
    
    await userEvent.click(decreaseFontSizeButton);

    const newFontSize = parseInt(window.getComputedStyle(paragraphElement).fontSize);
    expect(newFontSize).toBe(currentFontSize - 1);
  });
});

describe("Tests for toggling dark/light modes:", () => {
  beforeEach(async () => {
    render(<App />);
  });
  
  test("Dark mode should be initially active", () => {
    const headerElement = screen.getByTestId("header");
    const backgroundColor = window.getComputedStyle(headerElement).backgroundColor;
    const textColor = window.getComputedStyle(headerElement).color;

    expect(backgroundColor).toBe(styles.black);
    expect(textColor).toBe(styles.white);
  });

  test("Dark mode should be deactivated after clicking the 'Toggle mode' button", async () => {
    const toggleModeButton = screen.getByTestId("toggle-mode-button");
    await userEvent.click(toggleModeButton);

    const headerElement = screen.getByTestId("header");
    const backgroundColor = window.getComputedStyle(headerElement).backgroundColor;
    const textColor = window.getComputedStyle(headerElement).color;

    expect(backgroundColor).toBe(styles.white);
    expect(textColor).toBe(styles.black);
  });
});