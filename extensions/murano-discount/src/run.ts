import type {
  RunInput,
  FunctionRunResult,
  Discount,
  Target,
} from "../generated/api";
import {
  DiscountApplicationStrategy,
} from "../generated/api";
import {
  MURANO_DISCOUNT_PERCENT_VALUE,
  MURANO_DISCOUNT_TEXT
} from './constants'
import { validateMuranoProduct } from "./helpers/validateMuranoProduct";

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