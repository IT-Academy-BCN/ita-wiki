import { screen, render } from "@testing-library/react";
import { Label } from "../../components/atoms";
import { colors, font } from "../../styles";
import React from "react";
import { expect, it, describe } from "vitest";

describe("Label", () => {
  it("renders correctly", () => {
    render(
      <Label htmlFor="label" text="Label test">
        Label test
      </Label>
    );

    const label = screen.getByText(/label test/i);
    expect(label).toBeInTheDocument();
    expect(label).toHaveProperty("htmlFor", "label");
    expect(label).toHaveStyle(`color: ${colors.gray.gray2}`);
    expect(label).toHaveStyle(`font-size: ${font.xs}`);
    expect(label).toHaveStyle("font-weight: 700");
  });
});
