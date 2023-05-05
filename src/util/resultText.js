import { cleanNumbers } from "./numbers";
import { add } from "../math";

export function generateResultText(result) {

    let resultText = '';

    if (result === 'invalid') {
        resultText = 'Invalid input. You must enter valid numbers.';
      } else if (result !== 'no-calc') {
        resultText = 'Result: ' + result;
      }

      return resultText;
      
}

export function calculateResult(numberInputs) {
    let result = '';
    try {

    const numbers = cleanNumbers(numberInputs)

    result = add(numbers).toString()
  } catch (error) {
    result = error.message;
  }
  return result;
}

 // in-source test suites
 if (import.meta.vitest) {
    const { describe, it, expect } = import.meta.vitest

    describe.concurrent('generateResultText', () => {
    it('In-line test: generate a string, no matter which value is passed in', () => {
      // Arrange
    const number = 1
    const string = 'invalid'
    const bool = true
    // Act
    const resultNumber = generateResultText(number)
    const resultString = generateResultText(string)
    const resultBool = generateResultText(bool)
    // Assert
    expect(resultNumber).to.toBeTypeOf('string');
    expect(resultString).to.toBeTypeOf('string');
    expect(resultBool).to.toBeTypeOf('string');
    })

    it('should return a string that contains the calculation result if a number is provided as a result', () => {
        const result = 5;
    
        const resultText = generateResultText(result);
    
        expect(resultText).toContain(result.toString());
      });
    
      it('should return an empty string if "no-calc" is provided as a result', () => {
        const result = 'no-calc';
    
        const resultText = generateResultText(result);
    
        expect(resultText).toBe('');
      });
    
      it('should return a string that contains "Invalid" if "invalid" is provided as a result', () => {
        const result = 'invalid';
    
        const resultText = generateResultText(result);
    
        expect(resultText).toContain('Invalid');
      });
    })

    }