import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Utils from "../utils/Utils";

const utils = new Utils();
const { max, min } = utils.validFontSizes;

describe("Screen components:", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Should contain h1 tag with title 'E-reader'", () => {
    expect(screen.getByRole("heading", {name: "E-reader"})).toBeInTheDocument();
  });
  
  test("Should contain a range input with correct maximum and minimum values", () => {
    const rangeInput = screen.getByRole("slider");
    expect(rangeInput).toBeInTheDocument();
    expect(rangeInput).toHaveAttribute("max", utils.validFontSizes.max.toString());
    expect(rangeInput).toHaveAttribute("min", utils.validFontSizes.min.toString());
  });

  test("Should contain a list item with text 'Clear preferences'", () => {
    expect(screen.getByTestId("clear-preferences")).toBeInTheDocument();
  });

  test("Should contain a button with text 'Toggle mode'", () => {
    expect(screen.getByTestId("toggle-mode-button"));
  });
})

describe("Font size management:", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Range input should have label with text containing 'Font size'", () => {
    const labelElement = screen.getByText((content) => {
      return content.startsWith("Font size: ") && (content.endsWith("px"));
    });
    expect(labelElement).toBeInTheDocument();
  });

  test("Should increase font size by one unit when button '+' is clicked", async () => {
    const rangeInput = screen.getByRole("slider");
    const currentFontSize = Number(rangeInput.getAttribute("value"));
    const increaseFontSizeButton = screen.getByRole("button", {name: "+"});

    await userEvent.click(increaseFontSizeButton);
    await userEvent.click(increaseFontSizeButton);

    const newFontSize = Number(rangeInput.getAttribute("value"));
    expect(newFontSize).toBe(currentFontSize + 2);
  });

  test("Should decrease font size by one unit when button '-' is clicked", async () => {
    const rangeInput = screen.getByRole("slider");
    const currentFontSize = Number(rangeInput.getAttribute("value"));
    const decreaseFontSizeButton = screen.getByRole("button", {name: "-"});

    await userEvent.click(decreaseFontSizeButton);
    await userEvent.click(decreaseFontSizeButton);
    await userEvent.click(decreaseFontSizeButton);

    const newFontSize = Number(rangeInput.getAttribute("value"));
    expect(newFontSize).toBe(currentFontSize - 3);
  });

  test("Should not allow font size to increase if the new size is bigger than the maximum size allowed", async () => {
    const rangeInput = await screen.findByRole("slider");
    rangeInput.setAttribute("value", max.toString());
    const increaseFontSizeButton = screen.getByRole("button", {name: "+"});

    while(Number(rangeInput.getAttribute("value")) < max) {
      await userEvent.click(increaseFontSizeButton);
    }

    const newFontSize = rangeInput.getAttribute("value");
    expect(newFontSize).toBe(max.toString());
  });

  test("Should not allow font size to decrease if the new size is smaller than the maximum size allowed", async () => {
    const rangeInput = await screen.findByRole("slider");
    rangeInput.setAttribute("value", max.toString());
    const decreaseFontSizeButton = screen.getByRole("button", {name: "-"});

    while(Number(rangeInput.getAttribute("value")) > min) {
      await userEvent.click(decreaseFontSizeButton);
    }
    
    const newFontSize = rangeInput.getAttribute("value");
    expect(newFontSize).toBe(min.toString());
  });
});

describe("Toggle between dark and light modes", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Should be initially set as dark mode and switch to light mode after clicking the button", async () => {
    expect(document.body.classList.contains("dark-mode")).toBe(true);
    expect(document.body.classList.contains("light-mode")).toBe(false);

    const toggleModeButton = screen.getByTestId("toggle-mode-button");
    await userEvent.click(toggleModeButton);

    expect(document.body.classList.contains("dark-mode")).toBe(false);
    expect(document.body.classList.contains("light-mode")).toBe(true);
  });
})

describe("Clear preferences", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Should set configurations to default values when the button is clicked", async () => {
    const clearPreferencesButton = screen.getByTestId("clear-preferences");
    const toggleModeButton = screen.getByTestId("toggle-mode-button");

    await userEvent.click(toggleModeButton);

    const rangeInput = screen.getByRole("slider");
    rangeInput.setAttribute("value", max.toString());

    await userEvent.click(clearPreferencesButton);
    expect(rangeInput.getAttribute("value")).toBe(utils.defaultConfig.fontSize.toString());
    expect(document.body.classList.contains("dark-mode")).toBe(true);
  })
})