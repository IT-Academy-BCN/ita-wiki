/* eslint-disable no-console */
import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import * as matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom/vitest";
import { server } from "../__mocks__/server";

export const queryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    error: process.env.NODE_ENV === "test" ? () => {} : console.error,
  },
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

type TConstants = {
  urls: Record<string, string>;
  paths: Record<string, string>;
};

// Establish API mocking before all tests.
beforeAll(() => {
  vi.mock("../constants", async (importOriginal) => {
    const mod: TConstants = await importOriginal();
    const newUrls: TConstants["urls"] = {};
    Object.keys(mod.urls).forEach((key) => {
      newUrls[key] = `http://localhost:3000${mod.urls[key]}`;
    });
    return {
      ...mod,
      urls: newUrls,
    };
  });
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  cleanup();
  server.resetHandlers();
  queryClient.clear();
});
// Clean up after the tests are finished.
afterAll(() => server.close());

export { server as mswServer };
