export function validateStringNotEmpty(value) {
    if (value.trim().length === 0) {
      throw new Error('Invalid input - must not be empty.');
    }
  }
  
  export function validateNumber(number) {
    if (isNaN(number) || typeof number !== 'number') {
      throw new Error('Invalid number input.');
    }
  }

  // in-source test suites
if (import.meta.vitest) {
    const { describe, it, expect } = import.meta.vitest

    describe.concurrent('validateNumber', () => {
    it('In-line test: Validate positive number', () => {
      // Arrange
    const positiveNumbers = 1
    // Act
    const result = validateNumber(positiveNumbers)
    // Assert
    console.log(result)
    expect(result).to.toBe(undefined);
    })

    it('In-line test: Throw error for string number', () => {
        // Arrange
      const stringNumbers = '1'
      // Act
      const resultFn = () => {
        return validateNumber(stringNumbers);
    }
      // Assert
      expect(resultFn).toThrowError(/Invalid number input./);
      })

    it('Error thrown if invalid number passed', () => {
        const resultFn = () => {
            return validateNumber();
        }
        const resultInvalidFn = () => {
            return validateNumber('Invalid');
        }
        expect(resultFn).toThrow('Invalid number input.');
        expect(resultInvalidFn).toThrow('Invalid number input.');
      });
    })

    describe.concurrent('validateStringNotEmpty', () => {
        it('Error thrown if invalid input is empty', () => {
            const input = ''
            const resultFn = () => {
                return validateStringNotEmpty(input);
            }
            expect(resultFn).toThrow('Invalid input - must not be empty.');
          });

          it('Error thrown if input is any other value other than a string', () => {
            const inputNum = 1
            const inputBool = true
            const inputObj = {}

            const resultFnNum = () => {
                return validateStringNotEmpty(inputNum);
            }
            const resultFnBool = () => {
                return validateStringNotEmpty(inputBool);
            }
            const resultFnObj = () => {
                return validateStringNotEmpty(inputObj);
            }
            expect(resultFnNum).toThrow('value.trim is not a function');
            expect(resultFnBool).toThrow('value.trim is not a function');
            expect(resultFnObj).toThrow('value.trim is not a function');
          });
    })
    }