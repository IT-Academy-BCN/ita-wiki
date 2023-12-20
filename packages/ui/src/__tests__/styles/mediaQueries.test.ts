import { expect } from "vitest";
import { responsiveSizes, device } from "../../styles";

describe("device", () => {
  it("should have correct values", () => {
    expect(device.Mobile).toBe("screen and (min-width: 480px)");
    expect(device.Tablet).toBe("screen and (min-width: 768px)");
    expect(device.Laptop).toBe("screen and (min-width: 1024px)");
    expect(device.Desktop).toBe("screen and (min-width: 1280px)");
    expect(device.LaptopLg).toBe("screen and (min-width: 1440px)");
  })
});

describe("responsiveSizes", () => {
  it("should have correct values", () => {
    expect(responsiveSizes.mobileXl).toBe("480px");
    expect(responsiveSizes.tablet).toBe("768px");
    expect(responsiveSizes.laptop).toBe("1024px");
    expect(responsiveSizes.desktop).toBe("1280px");
    expect(responsiveSizes.laptopLg).toBe("1440px");
  })
})
