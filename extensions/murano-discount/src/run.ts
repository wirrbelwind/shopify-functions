import type {
  RunInput,
  FunctionRunResult,
  Discount,
  Target,
  CartLine,
  Cart
} from "../generated/api";
import {
  DiscountApplicationStrategy,
} from "../generated/api";
import {
  MURANO_DISCOUNT_PERCENT_VALUE,
  MURANO_DISCOUNT_TEXT
} from './constants'


type Configuration = {};

const validateMuranoProduct = (line) => {
  console.log(line.attribute)
  return line.attribute?.key === "_murano_product" && line.quantity > 1
}

export function run(input: RunInput): FunctionRunResult {
  const lineTargets: Target[] = input.cart.lines
    .filter(validateMuranoProduct)
    .map((line) => ({
      cartLine: {
        id: line.id,
        quantity: line.quantity
      }
    }))

  const discounts: Discount[] = [{
    targets: lineTargets,
    message: MURANO_DISCOUNT_TEXT,
    value: {
      percentage: {
        value: MURANO_DISCOUNT_PERCENT_VALUE
      }
    }
  }];

  return {
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts,
  };
};