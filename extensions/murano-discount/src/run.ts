import type {
  RunInput,
  FunctionRunResult,
  Discount,
  Target,
  CartLine
} from "../generated/api";
import {
  DiscountApplicationStrategy,
} from "../generated/api";
import {
  MURANO_DISCOUNT_PERCENT_VALUE,
  MURANO_DISCOUNT_TEXT
} from './constants'


type Configuration = {};

const validateMuranoProduct = (line: CartLine) => {
  return line.attribute?.["_murano_product"] && line.quantity > 1
}

export function run(input: RunInput): FunctionRunResult {
  const configuration: Configuration = JSON.parse(
    input?.discountNode?.metafield?.value ?? "{}"
  );
  const lineTargets: Target[] = input.cart.lines
    .filter(validateMuranoProduct)
    .map((line: CartLine) => ({
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