import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
// import Utils from "../utils/Utils";

// const utils = new Utils();
// const { max, min } = utils.validFontSizes;

describe("Tests for component Header:", () => {
  beforeEach(() => {
    render(<App />);
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

  test("Should display an ul with data-testid 'header-ul' when 'toggle-menu-button' is clicked", async () => {
    const toggleMenuButton = screen.getByTestId("toggle-menu-button");

    expect(screen.queryByTestId("header-ul")).not.toBeInTheDocument();
    await userEvent.click(toggleMenuButton);
    const headerUl = screen.getByTestId("header-ul");
    expect(headerUl).toBeInTheDocument();
  });

  test("Menu should contain two li tags and a range input.", async () => {
    const toggleMenuButton = screen.getByTestId("toggle-menu-button");

    await userEvent.click(toggleMenuButton);
    const headerUl = screen.getByTestId("header-ul");
    
    expect(headerUl).toHaveTextContent("Font size: ");
    expect(headerUl).toHaveTextContent("Clear preferences");
  });
});