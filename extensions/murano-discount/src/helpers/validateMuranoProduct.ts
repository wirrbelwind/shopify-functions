import { MURANO_ATTRIBUTE_KEY } from "../constants"

export const validateMuranoProduct = (line) => {
  console.log(line.attribute)
  return line.attribute?.key === MURANO_ATTRIBUTE_KEY && line.quantity > 1
}