import { it, expect, vi, beforeEach, afterEach } from "vitest";
import { sendDataRequest } from "./http";
import { HttpError } from "./errors";

const testResponseData = {
  key: "test",
};
const testFetch = vi.fn((url, options) => {
  return new Promise((resolve, reject) => {
    const testResponse = {
      ok: true,
      json() {
        return new Promise((resolve, reject) => {
          resolve(testResponseData);
        });
      },
    };
    resolve(testResponse);
  });
});
vi.stubGlobal("fetch", testFetch);

describe.concurrent("sendDataRequest", () => {
  beforeEach(() => {
    vi.mock("fetch");
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
  it("Should return any available response data", async () => {
    // Arrange

    // Mocks the fs.join method and returns a value

    const testData = { key: "test" };
    const url = "https://dummy-site.dev/posts";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    };
    // Act
    const result = await sendDataRequest(testData);
    // Assert
    expect(result).toBeDefined();
    expect(result).toEqual(testResponseData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, options);
  });

  it("Should convert the provided data to json", async () => {
    testFetch.mockImplementationOnce((url, options) => {
      return new Promise((resolve, reject) => {
        if (typeof options.body !== "string") {
          return reject("Not a string");
        }
        resolve();
      });
    });

    const testData = { key: "test" };
    let errorMessage;

    // Act
    try {
      await sendDataRequest(testData);
    } catch (err) {
      errorMessage = err;
    }

    expect(errorMessage).not.toBe("Not a string");
  });

  it("Should throw an httpError when sending the request failed", async () => {
    // Arrange

    // Mocks the fs.join method and returns a value
    const testResponseData = {
      key: "test",
    };
    testFetch.mockImplementationOnce((url, options) => {
      return new Promise((resolve, reject) => {
        const testResponse = {
          ok: false,
          json() {
            return new Promise((resolve, reject) => {
              resolve(testResponseData);
            });
          },
        };
        resolve(testResponse);
      });
    });

    // Act
    const testData = { key: "test" };
    let errorMessage;

    try {
      await sendDataRequest(testData);
    } catch (err) {
      errorMessage = err;
    }
    // Assert
    expect(errorMessage).toBeInstanceOf(HttpError);
  });
});
