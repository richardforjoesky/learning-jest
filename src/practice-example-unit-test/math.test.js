import { add } from './math';
import { describe, test, expect } from 'vitest'

// Describes expected behavior - AAA
/*
Arrange - Define the testing environment and values
Act - Run the actual code / function that should be tested
Assert - Evaluate the produced value / result and compare it to the expected
*/
describe.concurrent('addition', () => {

  test('Sum of positive numbers', () => {
    // Arrange
    const positiveNumbers = [1,2,3]
    // Act
    const result = add(positiveNumbers)
    // Assert
    expect(result).to.toBe(6);
  });

  test('Sum of negative numbers', () => {
    const negativeNumbers = [-1,-2,-3]
    const result = add(negativeNumbers)
    expect(result).to.toBe(-6);
  });

  test('Sum of mixed numbers', () => {
    const mixedNumbers = [-1,-2,3]
    const result = add(mixedNumbers)
    expect(result).to.toBe(0);
  });

  test('Sum of invalid numbers', () => {
  
    const strings = ["Invalid",1]
    const result = add(strings)
    expect(result).toBeNaN();
  });

  test('Sum of numbers as strings', () => {
    
    const strings = ["1","2","3"]
    const result = add(strings)
    expect(result).toBe(6);
  });

  test('Error thrown if no value is passed', () => {
    const resultFn = () => {
        add();
    }
    expect(resultFn).toThrow('numbers is not iterable');
  });

  test('Throw an error if provided with multiple arguments instead of an array', () => {
    const num1 = 1
    const num2 = 2

    const resultFn = () => {
        add(num1, num2);
    }

    expect(resultFn).toThrow(/is not iterable/); // supports regular expression
  });

});