import { it, expect, beforeAll, beforeEach, afterEach, afterAll } from "vitest";

import { ValidationError } from "./errors";
import { validateNotEmpty } from "./validation";

beforeAll(() => {
  console.log("beforeAll()");
});

describe.concurrent("validateNotEmpty", () => {
  it("should throw error when empty string is provided", () => {
    const inputText = "";
    const message = "failed to get text";
    let errorMessage;
    try {
      validateNotEmpty(inputText, message);
    } catch (err) {
      errorMessage = err;
    }
    // Assert
    expect(errorMessage).toBeInstanceOf(ValidationError);
    expect(errorMessage.message).toEqual(message);
  });

  it("should throw error when string with blanks is provided", () => {
    const inputText = "         ";
    const message = "failed to get text";

    const validateNoEmptyFn = () => validateNotEmpty(inputText, message);

    expect(validateNoEmptyFn).toThrowError(message);
  });

  it("should throw error when text is undefined", () => {
    const inputText = undefined;
    const message = "failed to get text";

    const validateNoEmptyFn = () => validateNotEmpty(inputText, message);

    expect(validateNoEmptyFn).toThrowError(message);
  });

  it("should throw error when no text is passed", () => {
    const validateNoEmptyFn = () => validateNotEmpty();

    expect(validateNoEmptyFn).toThrowError();
  });

  it("Should complete whe valid values are passed", () => {
    const inputText = "Test";
    const message = "Success";

    const result = validateNotEmpty(inputText, message);

    expect(result).to.toBe(undefined);
  });
});
