import { describe, expect, it } from "vitest";
import { App } from "../App";
import { render, screen } from "./test-utils";

describe("App", () => {
  it("should render", () => {
    render(<App />);
    expect(screen.getByText("Front SSO")).toBeInTheDocument();
  });
});
