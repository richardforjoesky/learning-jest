import path from "path";
import { promises as fs } from "fs";

export default function writeData(data, filename) {
  const storagePath = path.join(process.cwd(), "src/mocking/data", filename);
  return fs.writeFile(storagePath, data);
}

// in-source test suites
if (import.meta.vitest) {
  const { describe, it, expect, vi, beforeEach, afterEach } = import.meta.vitest;

  describe.concurrent("writeData", () => {

    beforeEach(() => {
      vi.mock('fs');
    });

    afterEach(() => {
      vi.resetAllMocks();
    });
    it("In-line test: Should execute the writeFile method", async () => {
      // Arrange
      

      // Mocks the fs.join method and returns a value
      vi.mock('path', () => {
        return {
          default: {
            join: (...args) => {
              console.log(args);
              return args[args.length - 1]
            }
          }
        }
      });

      const testData = "Test1";
      const fileName = "Test1.txt";
      // Act
      const result = await writeData(testData, fileName);
      // Assert
      expect(result).toBeUndefined();
      expect(fs.writeFile).toHaveBeenCalledTimes(1);
      expect(fs.writeFile).toHaveBeenCalledWith(fileName, testData);
    });

    it("In-line test: should return a promise that resolves to no value is called ", async () => {
      // Arrange
      vi.mock('fs');

      const testData = "Test";
      const fileName = "Test.txt";
      // Act
      const result = await writeData(testData, fileName);
      // Assert
      expect(fs.writeFile).toBeCalled();
      expect(fs.writeFile).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });
  });
}
