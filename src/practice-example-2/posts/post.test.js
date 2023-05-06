import { it, expect, vi, beforeEach, afterEach } from "vitest";
import { extractPostData } from "./posts";

let testFormData;
let testTitle = 'Title'
let testContent = 'Content'
describe.concurrent("extractPostData", () => {
    beforeEach(() => {
        testFormData = {
          title: testTitle,
          content: testContent,
          get(identifier) {
              return this[identifier]
          }
        }
    });
  
    afterEach(() => {
      vi.resetAllMocks();
    });
    it("Should extract title and content from the provided form data", () => {
      // Arrange
      
  
      // Mocks the fs.join method and returns a value
  
      // Act
      const data = extractPostData(testFormData)
     
      // Assert
      expect(data).toBeDefined();
      expect(data).toEqual({title: testTitle, content: testContent});
      
    });
})