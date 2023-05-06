import {validateStringNotEmpty , validateNumber } from './validation'

export function transformToNumber(value) {
    return +value;
  }

  export function cleanNumbers(numberValues) {
    const numbers = [];
    for (const numberValue of numberValues) {
      validateStringNotEmpty(numberValue);
      const number = transformToNumber(numberValue);
      validateNumber(number);
      numbers.push(number);
    }
    return numbers;
}

  
// in-source test suites
if (import.meta.vitest) {
    const { describe, it, expect } = import.meta.vitest
    describe.concurrent('generateResultText', () => {
        it('In-line test: Transform positive number', () => {
            // Arrange
          const positiveNumbers = 1
          // Act
          const result = transformToNumber(positiveNumbers)
          // Assert
          expect(result).to.toBe(1);
          expect(result).to.toBeTypeOf('number');
          })
      
          it('In-line test: Transform negative number', () => {
              // Arrange
            const negativeNumbers = -1
            // Act
            const result = transformToNumber(negativeNumbers)
            // Assert
            expect(result).to.toBe(-1);
            expect(result).to.toBeTypeOf('number');
            })
      
            it('In-line test: Transform string number to number type', () => {
              // Arrange
            const stringNumbers = '1'
            // Act
            const result = transformToNumber(stringNumbers)
            // Assert
            expect(result).to.toBe(1);
            expect(result).to.toBeTypeOf('number');
            })
      
            it('In-line test: Transform negative string number to number type', () => {
              // Arrange
            const stringNumbers = '-1'
            // Act
            const result = transformToNumber(stringNumbers)
            // Assert
            expect(result).to.toBe(-1);
            expect(result).to.toBeTypeOf('number');
            })
      
            it('In-line test: Yield NaN for non-transformable values', () => {
              // Arrange
            const positiveNumbers = [1,2,3]
            const objectNumbers = {1: 1}
            // Act
            const result = transformToNumber(positiveNumbers)
            const objectResult = transformToNumber(objectNumbers)
            // Assert
            expect(result).to.toBeNaN;
            expect(objectResult).to.toBeNaN;
            })
    })
    describe.concurrent('cleanNumbers', () => {
        it('In-line test: Should return an array of number values if an array of string number values is provided', () => {
            // Arrange
          const numberValues = ["1", "2"]
          // Act
          const result = cleanNumbers(numberValues)
          // Assert
          expect(result[0]).to.toBeTypeOf('number');
          expect(result).to.toBeTypeOf('object');
          })

          it('should throw an error if an array with at least one empty string is provided', () => {
            // Arrange
          const numberValues = ["1", ""]
          // Act
          const cleanFn = () => cleanNumbers(numberValues)
          // Assert
          expect(cleanFn).to.toThrow(/Invalid input - must not be empty./);
          })
    })
    
  }  