import { add } from './math';

describe('addition', () => {

    const numbers = [1,2,3]

  it('should return correct answer', () => {
    expect(add(numbers)).toBe(6);
  });

});