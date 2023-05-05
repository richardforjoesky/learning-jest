export function add(numbers) {
    let sum = 0;
  
    for (const number of numbers) {
      sum += +number;
    }
    return sum;
  }

  // in-source test suites
  if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest
    it('In-line test: Sum of positive numbers', () => {
      // Arrange
    const positiveNumbers = [1,2,3]
    // Act
    const result = add(positiveNumbers)
    // Assert
    expect(result).to.toBe(6);
    })
  }