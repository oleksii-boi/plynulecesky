import { describe, expect, it } from "vitest";
import { switchLocalePath, isLocale, defaultLocale } from "@/lib/i18n/locales";

describe("switchLocalePath", () => {
  it("swaps the locale segment while preserving the rest of the path", () => {
    expect(switchLocalePath("/uk/pricing/", "cs")).toBe("/cs/pricing/");
    expect(switchLocalePath("/cs/", "uk")).toBe("/uk/");
  });

  it("prepends the locale if the path has none", () => {
    expect(switchLocalePath("/", "cs")).toBe("/cs/");
  });
});

describe("isLocale", () => {
  it("accepts supported locales and rejects everything else", () => {
    expect(isLocale("uk")).toBe(true);
    expect(isLocale("cs")).toBe(true);
    expect(isLocale("en")).toBe(false);
  });
});

describe("defaultLocale", () => {
  it("is Ukrainian, matching the current live site", () => {
    expect(defaultLocale).toBe("uk");
  });
});
