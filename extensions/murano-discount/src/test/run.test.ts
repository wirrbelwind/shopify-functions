import { describe, it, expect } from 'vitest';
import { run } from '../run';
import { FunctionResult, DiscountApplicationStrategy } from '../../generated/api';
import input from './input.test.json'
import output from './output.test.json'

describe('product discounts function', () => {
  it('applies discount only to cart lines with all conditions', () => {
    const result = run(input);

    expect(result).toEqual(output);
  });
});