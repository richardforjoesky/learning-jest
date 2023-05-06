import { it, expect, beforeAll, beforeEach, afterEach, afterAll } from "vitest";

import { HttpError, ValidationError } from "./errors";

let httpError;
let validationError;
const statusCode = 200;
const message = "success";
const data = { name: "my-name" };

beforeAll(() => {
  httpError = new HttpError(statusCode, message, data);
  validationError = new ValidationError(message);

  console.log("beforeAll()");
});

describe.concurrent("HttpError", () => {
  beforeAll(() => {
    const statusCode = 200;
    const message = "success";
    const data = { name: "my-name" };

    const httpError = new HttpError(statusCode, message, data);
    const validationError = new ValidationError(message);

    console.log("beforeAll()");
  });
  it("should have the status code, message and data values stored", () => {
    expect(httpError.statusCode).toBe(statusCode);
    expect(httpError.message).toBe(message);
    expect(httpError.data).toBe(data);
  });

  it("should have the status code, message and data values as undefined", () => {
    const httpErrorUndefined = new HttpError();

    expect(httpErrorUndefined.statusCode).toBe(undefined);
    expect(httpErrorUndefined.message).toBe(undefined);
    expect(httpErrorUndefined.data).toBe(undefined);
  });

  it("should have an statusCode property", () => {
    expect(httpError).toHaveProperty("statusCode");
  });

  it("should have an message property", () => {
    expect(httpError).toHaveProperty("message");
  });

  it("should have an data property", () => {
    expect(httpError).toHaveProperty("data");
  });
});

describe.concurrent("ValidationError", () => {
  it("should have the message values stored", () => {
    expect(validationError.message).toBe(message);
  });

  it("should have the status code, message and data values as undefined", () => {
    const validationErrorUndefined = new ValidationError();;

    expect(validationErrorUndefined.message).toBe(undefined);
  });

  it("should have an message property", () => {
    expect(validationError).toHaveProperty("message");
  });
});
